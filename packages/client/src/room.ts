import type { Awareness, Presence, User } from './types'

/**
 * Wraps the provider's awareness to provide helper methods to listen to changes in self
 * presence, other users' presence and all users' presence.
 *
 * @example
 * const room = new Room(provider.awareness)
 *
 * // listen to changes in all users' presence
 * room.subscribe('users', (users) => {
 *     // do something
 * })
 */
export class Room {
  awareness: Awareness
  private listeners: RoomListener<Presence> = { others: [], users: [], self: [] }

  constructor(awareness: Awareness) {
    this.awareness = awareness

    // initialize the user's presence (using only the client id)
    this.awareness.setLocalState({
      id: this.awareness.clientID,
    })

    // listen to changes in awareness and notify any listeners
    this.awareness.on('change', () => {
      const others = this.getOthers()
      this.listeners.others.forEach((callback) => {
        callback(others)
      })

      const users = this.getUsers()
      this.listeners.users.forEach((callback) => {
        callback(users)
      })
    })
  }

  subscribe<T extends Presence>(
    event: 'users' | 'others',
    callback: UsersEventCallback<T>
  ): () => void

  subscribe<T extends Presence>(event: 'self', callback: UserEventCallback<T>): () => void

  subscribe<T extends Presence>(
    event: keyof RoomListener<T>,
    callback: UsersEventCallback<T> | UserEventCallback<T>
  ) {
    switch (event) {
      case 'users':
      case 'others':
        this.listeners[event].push(callback as UsersEventCallback)
        return () => this.unsubscribe(event, callback as UsersEventCallback)
      case 'self':
        this.listeners[event].push(callback as UserEventCallback)
        return () => this.unsubscribe(event, callback as UserEventCallback)
      default:
        console.warn('event not recognized')
        return {}
    }
  }

  unsubscribe<T extends Presence>(event: 'users' | 'others', callback: UsersEventCallback<T>): void

  unsubscribe<T extends Presence>(event: 'self', callback: UserEventCallback<T>): void

  unsubscribe<T extends Presence = Presence>(
    event: keyof RoomListener<T>,
    callback: UsersEventCallback<T> | UserEventCallback<T>
  ) {
    for (let i = 0; i < this.listeners[event].length; i++) {
      if (callback === this.listeners[event][i]) {
        this.listeners[event].splice(i, 1)
      }
    }
  }

  setPresence<T extends Presence = Presence>(presence: T): void {
    const updatedUser: User<T> = {
      id: this.awareness.clientID,
      presence: presence,
    }
    this.awareness.setLocalState(updatedUser)
    this.listeners.self.forEach((listener) => {
      listener(updatedUser)
    })
  }

  getSelf<T extends Presence = Presence>(): User<T> {
    return this.awareness.getLocalState() as User<T>
  }

  getOthers<T extends Presence = Presence>(): User<T>[] {
    const users = Array.from(this.awareness.getStates().values()) as User<T>[]
    return users.filter((user) => user.id !== this.awareness.clientID)
  }

  getUsers<T extends Presence = Presence>(): User<T>[] {
    const users = Array.from(this.awareness.getStates().values()) as User<T>[]
    return users
  }

  destroy() {
    this.awareness.setLocalState(null)
  }
}

type UserEventCallback<T extends Presence = Presence> = (self: User<T>) => void

type UsersEventCallback<T extends Presence = Presence> = (users: User<T>[]) => void

interface RoomListener<T extends Presence = Presence> {
  users: UsersEventCallback<T>[]
  others: UsersEventCallback<T>[]
  self: UserEventCallback<T>[]
}