import { Presence } from '@y-presence/client'
import React from 'react'
import { useRoom } from './useRoom'

export function useUpdatePresence<T extends Presence>() {
  const room = useRoom<T>()

  const updatePresence = React.useCallback(
    (partial: Partial<T>) => {
      room.updatePresence(partial)
    },
    [room]
  )

  return updatePresence
}
