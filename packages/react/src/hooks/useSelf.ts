import type { Presence, User } from '@y-presence/client'
import React from 'react'
import { useRoom } from './useRoom'

/**
 * The `useSelf` hook returns an object `self` containing information about the current user and a function `setPresence` to update the user's presence.
 * The `useSelf` hook behaves similarly to the `useState` hook as calling the `setPresence` method causes a rerender and updates the `self` object.
 *
 * The `self` object contains the user client/connection id and a field to store a presence object. It looks like the following:
 *
 * ```
 * User<T> = {
 *    id: number, // The client id associated to the user
 *    presence?: T // The user presence
 * }
 * ```
 *
 * @example
 * import { useSelf } from "@y-presence/react";
 *
 * // Define the presence object (ignore if not typescript)
 * type CursorPresence = {
 *    x: number;
 *    y: number;
 * }
 *
 * export default function Room() {
 *    const { self, setPresence } = useSelf<CursorPresence>();
 *
 *    React.useEffect(() => {
 *      setPresence( {x: 0, y: 0} )
 *    }, [])
 *
 *    return (
 *        <div>
 *          <p>Client id: {self.id}</p>
 *          <p>Presence: {self.presence}</p>
 *        </div>
 *    )
 * }
 */
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
