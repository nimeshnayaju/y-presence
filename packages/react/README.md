# @y-presence/react

React hooks to add multiplayer presence (live cursors/avatars) to any react application.

- Lightweight: 13.99kb gzipped

### Codesandbox demo/examples

For all the demos, you can open a new tab on your browser to observe how the presence updates in each example.

- Simple room: [Demo](https://7ll3u.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-simple-room-7ll3u)
- Live cursors: [Demo](https://bj2p2.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-live-cursors-bj2p2)
- Live avatars: [Demo](https://65xpc.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-live-avatars-65xpc)

### Other examples/integrations:

- perfect-cursors: [Demo](https://9ej521.csb.app/) | [Code](https://codesandbox.io/s/9ej521)

[![Edit y-presence](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/y-presence-demo-live-avatars-65xpc)

### Installation

```bash
yarn add @y-presence/react
# or
npm i @y-presence/react
```

### Usage

Wrap the components you'd like to provide access to `@y-presence/react` hooks inside `RoomProvider` in your React application.

```tsx
// src/app.js

import * as Y from 'yjs'
import { RoomProvider } from '@y-presence/react'

// Create the shared doc (from Yjs)
const doc = new Y.Doc()

// Create a provider
const provider = ...

// Get the provider's awareness API
const awareness = provider.awareness

// Define your presence object here
interface AppPresence {
  name: string;
  color: string;
}

// Define your initial app presence
const initialPresence: AppPresence = { name: "John Doe" }

export default function App() {
  return (
    <RoomProvider<AppPresence> awareness={awareness} initialPresence={initialPresence}>
      <SimpleRoom />
    </RoomProvider>
  )
}
```

### Using y-presence react hooks

`@y-presence/react` comes with six hooks: `useOthers()`, `useUsers()`, `useSelf()`, `useUpdatePresence`, `useSetPresence` and `useRoom()`.

- `useOthers()`:
  The `useOthers` hook returns an array of users that are currently connected in the room (excluding yourself). Each user object in the array contains the client/connection id and the presence information associated to the user.

  ```tsx
  import { useOthers } from '@y-presence/react'

  export default function Room() {
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
  ```

- `useUsers()`:
  The `useUsers` hook returns an array of users that are currently connected in the room (including yourself). Each user object in the array contains the client/connection id and the presence information associated to the user.

  ```tsx
  import { useUsers } from '@y-presence/react'

  export default function Room() {
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
  ```

- `useSelf()`:

  The `useSelf` hook returns a `User` object containing information about the current user. This hook triggers a rerender everytime the user presence is updated (using either of `useSetPresence` or `useUpdatePresence` hook). We'll learn more about `useSetPresence` and `useUpdatePresence` below.

  ```tsx
  import { useSelf } from '@y-presence/react'

  export default function Room() {
    const self = useSelf<AppPresence>()

    return (
      <>
        <h3>Self</h3>
        <p>{self.presence.name}</p>
        <p>{self.presence.name}</p>
      </>
    )
  }
  ```

- `useUpdatePresence()`:

  The `useUpdatePresence` hook returns a the `updatePresence` method that accepts a subset of the presence object. Because this method updates the user's presence object, any component that is using the `useSelf` method is rerendered.

  ```tsx
  import { useSelf, useUpdatePresence } from '@y-presence/react'

  export default function Room() {
    const self = useSelf<AppPresence>()

    const updatePresence = useUpdatePresence<AppPresence>()

    const updateColor = () => {
      updatePresence({ color: 'red' })
    }

    return (
      <>
        <p>{self.presence.color}</p>
        <button onClick={updateColor}>Update Color to Red</button>
      </>
    )
  }
  ```

- `useSetPresence()`:

  The `useSetPresence` hook returns a the `setPresence` method that accepts a a presence object (unlike only a subset of presence object in `useUpdatePresence`). This method overrides the current presence object in a single transaction. Because this method updates the user's presence object, any component that is using the `useSelf` method is rerendered.

  ```tsx
  import { useSelf, useSetPresence } from '@y-presence/react'

  export default function Room() {
    const self = useSelf<AppPresence>()

    const setPresence = useSetPresence<AppPresence>()

    const updateNameAndColor = () => {
      setPresence({ name: 'Jane Doe', color: 'red' })
    }

    return (
      <>
        <p>{self.presence.color}</p>
        <button onClick={updateNameAndColor}>Update Name and Color</button>
      </>
    )
  }
  ```

- `useRoom()`:
  The `useRoom` hook returns a `Room`, a thin wrapper around the provider awareness. This object provides helper methods to listen to various user events in a room. For more examples on how to use the `Room` object, check out [@y-presence/client](https://github.com/nimeshnayaju/y-presence/tree/main/packages/client).

  ```tsx
  import { useRoom } from '@y-presence/react'

  export default function Room() {
    const room = useRoom<AppPresence>()
    const [numUsers, setNumUsers] = React.useState(room.getUsers().length)

    React.useEffect(() => {
      const unsubUsers = room.subscribe('users', (users) => {
        setNumUsers(users.length)
      })

      return () => {
        unsubUsers()
      }
    }, [])

    return <p>Number of connected users: {numUsers}</p>
  }
  ```

### License

This project is licensed under MIT.

## Author

- [@nayajunimesh](https://twitter.com/nayajunimesh)
