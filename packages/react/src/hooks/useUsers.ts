import type { Presence, User } from '@y-presence/client'
import React from 'react'
import { useRoom } from './useRoom'

/**
 * The `useUsers` hook returns an array of users that are currently connected in the room (including yourself).
 * Each user object in the array contains the client/connection id and the presence information associated to the user.
 *
 * ```
 * User<T> = {
 *    id: number, // The client id associated to the user
 *    presence?: T // The user presence
 * }
 * ```
 *
 * @example
 * import { useUsers } from "@y-presence/react";
 *
 * export default function Room() {
 *    const users = useUsers();
 *
 *    return <p>Number of connected users: {users.length}</p>
 * }
 */
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
