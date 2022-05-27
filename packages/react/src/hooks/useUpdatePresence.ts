import React from 'react'
import { useRoom } from './useRoom'

export function useUpdatePresence<T>() {
  const room = useRoom<T>()

  const updatePresence = React.useCallback(
    (partial: Partial<T>) => {
      room.updatePresence(partial)
    },
    [room]
  )

  return updatePresence
}
