import { useOthers, useSelf, useUsers } from '@y-presence/react'
import React from 'react'
import { USER_COLORS, USER_NAMES } from '../constants'
import { CursorPresence } from '../types'
import { Cursor } from './Cursor'

const random = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const initial: CursorPresence = {
  x: 0,
  y: 0,
  name: random(USER_NAMES),
  color: random(USER_COLORS),
}

export default function Room() {
  const others = useOthers<CursorPresence>()
  const users = useUsers()
  const { setPresence } = useSelf<CursorPresence>()

  const handlePointMove = React.useCallback(
    (e: React.PointerEvent) => {
      setPresence({
        x: e.clientX,
        y: e.clientY,
        name: initial.name,
        color: initial.color,
      })
    },
    [setPresence]
  )

  return (
    <div className="room" onPointerMove={handlePointMove}>
      <div className="info">Number of connected users: {users.length}</div>

      {others.map((user) => {
        if (!user.presence) return null
        const { x, y, name, color } = user.presence
        return <Cursor key={user.id} x={x} y={y} name={name} color={color} />
      })}
    </div>
  )
}
