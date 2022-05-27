import type { Awareness, Presence, User } from './types'

/**
 * Wraps the provider's awareness to provide helper methods to listen to changes in self
 * presence, other users' presence and all users' presence.
 *
 * @example
 *
 * interface AppPresence {
 *     name: string;
 * }
 *
 * const initialPresence: AppPresence = { name: "John Doe" }
 *
 * const room = new Room<AppPresence>(provider.awareness, initialPresence)
 *
 * // listen to changes in all users' presence
 * room.subscribe('users', (users) => {
 *     // do something
 * })
 */
export class Room<T extends Presence = Presence> {
  readonly awareness: Awareness

  private listeners: RoomListener<T> = {
    others: [],
    users: [],
    self: [],
  }

  /**
   * Creates a new instance of a room to manipulate the current user's presence
   * @param awareness the awareness object associated to WebSocketProvider or WebrtcProvider
   * @param initialPresence the initial presence object to assign to the current user
   */
  constructor(awareness: Awareness, initialPresence: T) {
    this.awareness = awareness

    this.setPresence(initialPresence)

    this.awareness.on('change', (_: any, origin: any) => {
      const users = this.getUsers()
      this.listeners.users.forEach((callback) => {
        callback(users)
      })

      // if the transaction originated locally, do not notify listeners to "others"
      if ((origin as string) === 'local') {
        const self = this.getSelf()
        this.listeners.self.forEach((callback) => {
          callback(self)
        })
        return
      }

      const others = this.getOthers()
      this.listeners.others.forEach((callback) => {
        callback(others)
      })
    })
  }

  /**
   * Updates only a subset of the current user's presence object
   * @param partial a subset of the current user's presence object to update
   */
  updatePresence(partial: Partial<T>): void {
    for (const property in partial) {
      this.awareness.setLocalStateField(property, partial[property])
    }
  }

  /**
   * Overrides the presence object of the current user (or self) in a single transaction
   * @param presence the new presence object to set
   */
  setPresence(presence: T): void {
    this.awareness.setLocalState(presence)
  }

  /**
   * Returns the current user's id and their presence object
   * @returns the User object associated to the current user (or self)
   */
  getSelf(): User<T> {
    return {
      id: this.awareness.clientID,
      presence: this.awareness.getLocalState() as T,
    }
  }

  /**
   * Method to retrieve all connected users (excluding self) in the room
   * @returns an array of User object, where each user object is a user connected in the room (excluding self)
   */
  getOthers(): User<T>[] {
    const users: User<T>[] = []

    this.awareness.getStates().forEach((presence, id) => {
      if (id !== this.awareness.clientID) {
        users.push({ id: id, presence: presence as T })
      }
    })

    return users
  }

  /**
   * Method to retrieve all connected users (including self) in the room
   * @returns an array of User object, where each user object is a user connected in the room (including self)
   */
  getUsers(): User<T>[] {
    const users: User<T>[] = []

    this.awareness.getStates().forEach((presence, id) => {
      users.push({ id: id, presence: presence as T })
    })

    return users
  }

  /**
   * Listen to changes in all or other users' presence
   * @param event the event name: "users" or "others"
   * @param callback the function to run whenever presence associated to the provided event changes
   */
  subscribe(event: 'users' | 'others', callback: UsersEventCallback<T>): () => void

  /**
   * Listen to changes in self presence
   * @param event the event name: "self"
   * @param callback the function to run whenever self presence changes
   */
  subscribe(event: 'self', callback: UserEventCallback<T>): () => void

  /**
   * Listen to changes in all or other users' presence
   * @param event the event name: "users" or "others"
   * @param callback the function to run whenever presence associated to the provided event changes
   */
  subscribe(
    event: keyof RoomListener<T>,
    callback: UsersEventCallback<T> | UserEventCallback<T>
  ): () => void {
    if (event === 'users' || event === 'others') {
      this.listeners[event].push(callback as UsersEventCallback<T>)
      return () => this.unsubscribe(event, callback as UsersEventCallback<T>)
    } else {
      this.listeners[event].push(callback as UserEventCallback<T>)
      return () => this.unsubscribe(event, callback as UserEventCallback<T>)
    }
  }

  /**
   * Unsubscribe to changes in all or other users' presence
   * @param event the event name: "users" or "others"
   * @param callback the function to unsubscribe
   */
  unsubscribe(event: 'users' | 'others', callback: UsersEventCallback<T>): void

  /**
   * Unsubscribe to changes in self presence
   * @param event the event name: "self"
   * @param callback the function to unsubscribe
   */
  unsubscribe(event: 'self', callback: UserEventCallback<T>): void

  unsubscribe(
    event: keyof RoomListener<T>,
    callback: UsersEventCallback<T> | UserEventCallback<T>
  ) {
    for (let i = 0; i < this.listeners[event].length; i++) {
      if (callback === this.listeners[event][i]) {
        this.listeners[event].splice(i, 1)
      }
    }
  }

  /**
   * Sets the current user's presence object to null and destroys the awareness object
   */
  destroy() {
    this.awareness.setLocalState(null)
    this.awareness.destroy()
  }
}

type UsersEventCallback<T> = (users: User<T>[]) => void
type UserEventCallback<T> = (user: User<T>) => void

interface RoomListener<T> {
  users: UsersEventCallback<T>[]
  others: UsersEventCallback<T>[]
  self: UserEventCallback<T>[]
}
