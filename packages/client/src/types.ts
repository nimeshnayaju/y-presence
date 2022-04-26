import type { WebrtcProvider } from 'y-webrtc'
import type { WebsocketProvider } from 'y-websocket'

/**
 * The provider awareness property
 */
export type Awareness = WebsocketProvider['awareness'] | WebrtcProvider['awareness']

/**
 * Represents presence object that can be associated to a user
 */
export interface Presence {
  [key: string]: any
}

/**
 * Represents a user connected in the room
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
