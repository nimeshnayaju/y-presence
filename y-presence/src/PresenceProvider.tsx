import React from "react";
import type { Awareness, PresenceProviderProps, User } from "~types";

export const PresenceContext = React.createContext<Awareness | null>(null);

export function PresenceProvider({
  awareness,
  children
}: PresenceProviderProps) {

  // Store the intial user state
  React.useEffect(() => {
    const currUser = awareness.getLocalState();
    // If the awareness object is null or empty, then initialize it
    if (!currUser || Object.keys(currUser).length === 0) {
      const user: User = { id: awareness.clientID };
      awareness.setLocalState(user);
    }
  }, [awareness]);

  // Reset user's presence when they navigate away from the page
  React.useEffect(() => {
    function handleUnload() {
      awareness.setLocalState(null);
    }
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  });


  return (
    <PresenceContext.Provider value={awareness}>
      {children}
    </PresenceContext.Provider>
  );
}
