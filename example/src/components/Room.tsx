import React from "react";
import type { CursorPresence } from "types";
import { useOthers, useSelf } from "y-presence";
import { USER_COLORS } from "../constants";
import About from "./About";
import { Cursor } from "./Cursor";

const color = USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];

export default function Room() {
  const { updatePresence } = useSelf<CursorPresence>({
    x: 0,
    y: 0,
    color: color
  });

  const others = useOthers<CursorPresence>();

  const handlePointMove = React.useCallback(
    (e: React.PointerEvent) => {
      updatePresence({
        x: e.clientX,
        y: e.clientY
      });
    },
    [updatePresence]
  );

  return (
    <div className="room" onPointerMove={handlePointMove}>
      <About />
      {others.map(({ id, presence }) => {
        if (!presence) return null;
        return (
          <Cursor
            key={id}
            color={presence.color}
            x={presence.x}
            y={presence.y}
          />
        );
      })}
    </div>
  );
}
