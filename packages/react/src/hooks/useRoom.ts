import React from 'react'
import { RoomContext } from '~RoomProvider'

export function useRoom() {
  const room = React.useContext(RoomContext)

  if (room == null) {
    throw new Error("Couldn't find RoomProvider in the React tree")
  }

  return room
}
