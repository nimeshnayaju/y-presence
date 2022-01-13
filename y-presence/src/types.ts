import type React from "react";
import type { WebrtcProvider } from "y-webrtc";
import type { WebsocketProvider } from "y-websocket";

export type Awareness =
  | WebsocketProvider["awareness"]
  | WebrtcProvider["awareness"];

export type PresenceProviderProps = {
  awareness: Awareness;
  children: React.ReactNode;
};

export interface Presence {
  [key: string]: any;
}

export interface User<T extends Presence> {
  /**
   * The client id associated to the user
   */
  readonly id: number;
  /**
   * The user presence
   */
  readonly presence: T;
}

export type CursorPresence = {
  x: number;
  y: number;
  color: string;
};
