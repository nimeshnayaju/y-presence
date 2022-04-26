import { Room } from '@y-presence/client'
import React from 'react'
import type { RoomProviderProps } from './types'

export const RoomContext = React.createContext<Room | null>(null)

export function RoomProvider({ awareness, children }: RoomProviderProps) {
  const [room] = React.useState<Room>(() => {
    return new Room(awareness)
  })

  React.useEffect(() => {
    return () => room.destroy()
  }, [])

  return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>
}
