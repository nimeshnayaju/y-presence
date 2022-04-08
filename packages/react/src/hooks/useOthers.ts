import type { Presence, User } from '@y-presence/client'
import React from 'react'
import { useRoom } from './useRoom'

export function useOthers<T extends Presence = Presence>() {
  const room = useRoom()
  const [others, setOthers] = React.useState<User<T>[]>(room.getOthers())

  React.useEffect(() => {
    const unsubOthers = room.subscribe<T>('others', (others) => {
      setOthers(others)
    })

    return () => unsubOthers()
  }, [room])

  return others
}
