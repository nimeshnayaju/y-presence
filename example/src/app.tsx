import Room from "components/Room";
import React from "react";
import { awareness } from "y";
import { PresenceProvider } from "y-presence";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <PresenceProvider awareness={awareness}>
        <Room />
      </PresenceProvider>
    </div>
  )
}