import React from 'react'
import useRerender from './useRerender'
import { useRoom } from './useRoom'

export function useOthers<T>() {
  const room = useRoom<T>()
  const rerender = useRerender()

  React.useEffect(() => {
    const unsubOthers = room.subscribe('others', rerender)

    return () => unsubOthers()
  }, [room])

  return room.getOthers()
}
