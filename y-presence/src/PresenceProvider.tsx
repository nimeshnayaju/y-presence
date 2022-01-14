import React from "react";
import type { Awareness, PresenceProviderProps } from "~types";

export const PresenceContext = React.createContext<Awareness | null>(null);

export function PresenceProvider({
  awareness,
  children
}: PresenceProviderProps) {
  return (
    <PresenceContext.Provider value={awareness}>
      {children}
    </PresenceContext.Provider>
  );
}
