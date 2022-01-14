import React from "react";
import { usePresence } from "~hooks";
import type { Presence, User } from "../types";

/**
 * The useOthers hook returns an array of users that are currently connected in the room
 * (excluding yourself). Each user object in the array contains the client/connection id
 * and the presence information associated to the user. The user object looks like the
 * following:
 *
 * ```
 * User<T> = {
 *    id: number, // The client id associated to the user
 *    presence?: T // The user presence
 * }
 * ```
 *
 * @example
 * import { useOthers } from "y-presence";
 *
 * // Define the presence object (ignore if not typescript)
 * type CursorPresence = {
 *    x: number;
 *    y: number;
 * }
 *
 * export default function Room() {
 *    const others = useOthers<CursorPresence>();
 *
 *    return (
 *        <>
 *          Number of other users: {others.length}
 *          others.map(({ id, presence }) => {
 *              if (!presence) return null;
 *
 *              return <Cursor key={id} x={presence.x} y={presence.y} />
 *          })
 *        </>
 *    )
 * }
 */
 export function useOthers<T extends Presence>(): User<T>[] {
  const presence = usePresence();

  const [users, setUsers] = React.useState<User<T>[]>([]);

  // Update the users state when the provider's awareness updates
  React.useEffect(() => {
    function handleChange() {
      setUsers(
        (Array.from(presence.getStates().values()) as User<T>[]).filter(
          (user) => user && user.id !== presence.clientID
        )
      );
    }

    handleChange();

    presence.on("change", handleChange);

    return () => {
      presence.off("change", handleChange);
    };
  }, [presence]);

  return users;
}
