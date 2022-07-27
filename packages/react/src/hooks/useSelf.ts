import { Presence } from '@y-presence/client'
import React from 'react'
import useRerender from './useRerender'
import { useRoom } from './useRoom'

export function useSelf<T extends Presence>() {
  const room = useRoom<T>()
  const rerender = useRerender()

  React.useEffect(() => {
    const unsubSelf = room.subscribe('self', rerender)

    return () => unsubSelf()
  }, [room])

  return room.getSelf()
}
