import * as React from "react";
import { useOthers } from "y-presence";

export default function About() {

  const others = useOthers();

  return (
    <div className="about">
      <a
        className="link"
        href="https://github.com/nimeshnayaju/y-presence"
        target="_blank"
        rel="noreferrer"
      >
        y-presence
      </a>
      <div className="info">
        There are currently {others.length} cursors present in the room
      </div>
    </div>
  );
}
