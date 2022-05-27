import {
  RoomProvider,
  useOthers,
  useRoom,
  useSelf,
  useUpdatePresence,
  useUsers,
} from '@y-presence/react'
import { useEffect, useState } from 'react'
import { WebsocketProvider } from 'y-websocket'
import { Doc } from 'yjs'
import './App.css'

const doc = new Doc()

// Create a websocket provider
export const provider = new WebsocketProvider('wss://demos.yjs.dev', 'y-presence-v2', doc)

// Export the provider's awareness API
export const awareness = provider.awareness

interface AppPresence {
  name: string
  color: string
}

const presence: AppPresence = { name: awareness.clientID.toString(), color: 'blue' }

export default function App() {
  return (
    <RoomProvider awareness={awareness} initialPresence={presence}>
      <Self />
      <All />
      <Others />
      <Room />
    </RoomProvider>
  )
}

function Self() {
  const self = useSelf<AppPresence>()

  const updatePresence = useUpdatePresence<AppPresence>()

  const updateColor = () => {
    updatePresence({ color: 'red' })
  }

  return (
    <>
      <h3>Self</h3>
      <p>{self.presence.name}</p>
      <p>{self.presence.color}</p>
      <button onClick={updateColor}>Update Color to Red</button>
    </>
  )
}

function All() {
  const users = useUsers<AppPresence>()

  return (
    <>
      <h3>Users</h3>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p>{user.presence.name}</p>
            <p>{user.presence.color}</p>
          </div>
        )
      })}
    </>
  )
}

function Others() {
  const others = useOthers<AppPresence>()

  return (
    <>
      <h3>Others</h3>
      {others.map((user) => {
        return (
          <div key={user.id}>
            <p>{user.presence.name}</p>
            <p>{user.presence.color}</p>
          </div>
        )
      })}
    </>
  )
}

function Room() {
  const room = useRoom<AppPresence>()

  const [numUsers, setNumUsers] = useState(room.getUsers().length)

  useEffect(() => {
    const unsubUsers = room.subscribe('users', (users) => {
      setNumUsers(users.length)
    })

    return () => {
      unsubUsers()
    }
  }, [])

  return <p>Number of connected users: {numUsers}</p>
}
