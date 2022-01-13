import React from "react";
import type { CursorPresence } from "types";
import { useOthers, useSelf } from "y-presence";
import { USER_COLORS } from "../constants";
import { Cursor } from "./Cursor";

const color = USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];

export default function CursorRoom() {
  const others = useOthers<CursorPresence>();

  const { updatePresence } = useSelf<CursorPresence>({
    x: 0,
    y: 0,
    color: color
  });

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
      {others
        .filter((user) => user)
        .map(({ id, presence }) => (
          <Cursor
            key={id}
            color={presence.color}
            x={presence.x}
            y={presence.y}
          />
        ))}
    </div>
  );
}
