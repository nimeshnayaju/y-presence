import React from "react";
import { PresenceContext } from "~PresenceProvider";

export function usePresence() {
  const presence = React.useContext(PresenceContext);

  if (presence == null) {
    throw new Error("Couldn't find PresenceProvider in the React tree");
  }

  return presence;
}
