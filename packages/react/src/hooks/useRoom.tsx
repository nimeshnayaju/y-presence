import { Awareness, Room } from '@y-presence/client'
import React from 'react'

interface RoomProviderProps<T> {
  awareness: Awareness
  initialPresence: T
  children: React.ReactNode
}

function createRoomContext<T>() {
  return React.createContext<Room<T> | null>(null)
}

const RoomContext = createRoomContext<any>()

export function RoomProvider<T>({ awareness, initialPresence, children }: RoomProviderProps<T>) {
  const [room] = React.useState<Room<T>>(() => new Room(awareness, initialPresence))

  return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>
}

export function useRoom<T>() {
  const room = React.useContext(RoomContext)

  if (room == null) {
    throw new Error("Couldn't find RoomProvider in the React tree")
  }

  return room as Room<T>
}
