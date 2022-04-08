import type { Presence, User } from '@y-presence/client'
import React from 'react'
import { useRoom } from './useRoom'

export function useUsers<T extends Presence = Presence>() {
  const room = useRoom()
  const [users, setUsers] = React.useState<User<T>[]>(room.getUsers())

  React.useEffect(() => {
    const unsubUsers = room.subscribe<T>('users', (users) => {
      setUsers(users)
    })

    return () => unsubUsers()
  }, [room])

  return users
}
