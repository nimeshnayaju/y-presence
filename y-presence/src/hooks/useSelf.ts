import React from "react";
import { usePresence } from "~hooks";
import type { Presence, User } from "~types";

export function useSelf<T extends Presence>(initialPresence: T) {
  const presence = usePresence();

  const [self, setSelf] = React.useState<User<T>>({
    id: presence.clientID,
    presence: initialPresence
  });

  // Set the user's initial state
  React.useEffect(() => {
    presence.setLocalState(self);
  }, [presence, self]);

  // Callback to update the current user's presence
  const updatePresence = React.useCallback(
    (overrides: Partial<T>) => {
      const updatedPresence = { ...self.presence, ...overrides };
      presence.setLocalState({ id: self.id, presence: updatedPresence });

      setSelf(presence.getLocalState() as User<T>);
    },
    [presence, self]
  );

  React.useEffect(() => {
    function handleUnload() {
      presence.setLocalState(null);
    }
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, [presence]);

  return {
    self,
    updatePresence
  };
}
