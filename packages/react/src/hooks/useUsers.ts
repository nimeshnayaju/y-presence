import React from 'react'
import useRerender from './useRerender'
import { useRoom } from './useRoom'

export function useUsers<T>() {
  const room = useRoom<T>()
  const rerender = useRerender()

  React.useEffect(() => {
    const unsubOthers = room.subscribe('users', rerender)

    return () => unsubOthers()
  }, [room])

  return room.getUsers()
}
