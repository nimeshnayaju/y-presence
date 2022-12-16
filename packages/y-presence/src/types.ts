/**
 * Represents presence object that can be associated to a user
 */
export interface Presence {
  [x: string]: any;
}

/**
 * Represents a user connected in the room
 */
export interface User<T> {
  /**
   * The client id associated to the user
   */
  readonly id: number;
  /**
   * The user presence
   */
  readonly presence: T;
}
