import type { Presence, User } from '@y-presence/client'
import React from 'react'
import { useRoom } from './useRoom'

/**
 * The `useOthers` hook returns an array of users that are currently connected in the room (excluding yourself).
 * Each user object in the array contains the client/connection id and the presence information associated to the user.
 *
 * ```
 * User<T> = {
 *    id: number, // The client id associated to the user
 *    presence?: T // The user presence object
 * }
 * ```
 *
 * @example
 * import { useOthers } from "@y-presence/react";
 *
 *
 * export default function Room() {
 *    const others = useOthers();
 *
 *    return (
 *        <p>Number of other users: {others.length}</p>
 *    )
 * }
 */
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
