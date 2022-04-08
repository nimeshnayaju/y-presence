import type { WebrtcProvider } from 'y-webrtc'
import type { WebsocketProvider } from 'y-websocket'

export type Awareness = WebsocketProvider['awareness'] | WebrtcProvider['awareness']

export interface Presence {
  [key: string]: any
}

/**
 * Represent a user object connected in the room
 */
export interface User<T extends Presence = Presence> {
  /**
   * The client id associated to the user
   */
  readonly id: number
  /**
   * The user presence
   */
  readonly presence?: T
}
