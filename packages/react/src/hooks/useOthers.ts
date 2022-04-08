import type { Presence, User } from '@y-presence/client'
import React from 'react'
import { useRoom } from './useRoom'

/**
 * The `useOthers` hook returns an array of users that are currently connected in the room
 * (excluding yourself). Each user object in the array contains the client/connection id
 * and the presence information associated to the user. The user object looks like the
 * following:
 *
 * ```
 * User<T> = {
 *    id: number, // The client id associated to the user
 *    presence?: T // The user presence
 * }
 * ```
 *
 * @example
 * import { useOthers } from "@y-presence/react";
 *
 * // Define the presence object (ignore if not typescript)
 * type CursorPresence = {
 *    x: number;
 *    y: number;
 * }
 *
 * export default function Room() {
 *    const others = useOthers<CursorPresence>();
 *
 *    return (
 *        <>
 *          Number of other users: {others.length}
 *          others.map(({ id, presence }) => {
 *              if (!presence) return null;
 *
 *              return <Cursor key={id} x={presence.x} y={presence.y} />
 *          })
 *        </>
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
