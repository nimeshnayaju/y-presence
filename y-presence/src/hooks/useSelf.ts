import React from "react";
import { usePresence } from "~hooks";
import type { Presence, User } from "~types";

const PRESENCE = "presence";

/**
 * The useSelf hook accepts an initial presence object and returns an object containing information
 * about the current user (represented as `self`) and a function to update the user's presence.
 *
 * The update function doesn't require the full presence object to update it. You may only send the
 * presence properties that you'd like changed in the presence.
 *
 * The `self` object contains the user client/connection id and a field to store a presence object.
 * It looks like the following:
 *
 * ```
 * User<T> = {
 *    id: number, // The client id associated to the user
 *    presence?: T // The user presence
 * }
 * ```
 *
 * @example
 * import { useSelf } from "y-presence";
 *
 * // Define the presence object (ignore if not typescript)
 * type CursorPresence = {
 *    x: number;
 *    y: number;
 * }
 *
 * export default function Room() {
 *    const { self, updatePresence } = useSelf<CursorPresence>({
 *        x: 0,
 *        y: 0
 *    });
 *
 *    // updatePresence doesn't require the full presence object
 *    updatePresence({x: 1});
 *
 *    updatePresence({y: 2});
 *
 *    return (
 *        <>
 *          Client id: {self.id}
 *          Presence: {self.presence}
 *        </>
 *    )
 * }
 */
 export function useSelf<T extends Presence>(
  initialPresence: T
): {
  self: User<T>;
  updatePresence: (overrides: Partial<T>) => void;
} {
  const presence = usePresence();

  // Store the current user
  const [self, setSelf] = React.useState<User<T>>({
    id: presence.clientID,
    presence: initialPresence
  });
  
  // Set the initial state of the user
  React.useEffect(() => {
    presence.setLocalState(self);
  }, [presence, self]);

  // Updates the current user's presence
  const updatePresence = React.useCallback(
    (overrides: Partial<T>) => {
      if (self) {
        const updatedPresence = { ...self.presence, ...overrides };
        presence.setLocalStateField(PRESENCE, updatedPresence);
  
        setSelf(presence.getLocalState() as User<T>);
      }
    },
    [presence, self]
  );

  return {
    self,
    updatePresence
  };
}

