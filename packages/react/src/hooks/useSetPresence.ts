import { Presence } from '@y-presence/client'
import React from 'react'
import { useRoom } from './useRoom'

export function useSetPresence<T extends Presence>() {
  const room = useRoom<T>()

  const setPresence = React.useCallback(
    (presence: T) => {
      room.setPresence(presence)
    },
    [room]
  )

  return setPresence
}
