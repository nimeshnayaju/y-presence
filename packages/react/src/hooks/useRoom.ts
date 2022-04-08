import React from 'react'
import { RoomContext } from '~RoomProvider'

/**
 * The `useRoom` hook returns a `Room`, a thin wrapper around the provider awareness. This object
 * provides helper methods to listen to various user events in a room.
 *
 * @example
 * import { useRoom } from "@y-presence/react";
 *
 *
 * export default function Room() {
 *    const room = useRoom();
 *    const [numUsers, setNumUsers] = React.useState(0);
 *
 *    React.useEffect(() => {
 *      room.subscribe("users", (users) => {
 *          setNumUsers(users.length);
 *      })
 *    }, [])
 *
 *    return (
 *        <>
 *          Number of connected users: {numUsers}
 *        </>
 *    )
 * }
 */
export function useRoom() {
  const room = React.useContext(RoomContext)

  if (room == null) {
    throw new Error("Couldn't find RoomProvider in the React tree")
  }

  return room
}
