import type { Presence, User } from '@y-presence/client'
import React from 'react'
import { useRoom } from './useRoom'

export function useSelf<T extends Presence = Presence>() {
  const room = useRoom()
  const [self, setSelf] = React.useState<User<T>>(room.getSelf())

  const setPresence = React.useCallback(
    (presence: T) => {
      room.setPresence(presence)
    },
    [room]
  )

  React.useEffect(() => {
    const unsubSelf = room.subscribe<T>('self', (self) => {
      setSelf(self)
    })

    return () => unsubSelf()
  }, [room])

  return {
    self,
    setPresence,
  }
}
