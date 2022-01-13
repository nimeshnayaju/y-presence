import React from "react";
import { usePresence } from "~hooks";
import type { Presence, User } from "../types";

export function useOthers<T extends Presence>() {
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

    presence.on("change", handleChange);

    return () => {
      presence.off("change", handleChange);
    };
  }, [presence]);

  return users;
}
