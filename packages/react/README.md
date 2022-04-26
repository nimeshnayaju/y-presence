# @y-presence/react

React hooks to add multiplayer presence (live cursors/avatars) to any react application.

- Lightweight: 14.86kb gzipped

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

export default function App() {
  return (
    <RoomProvider awareness={awareness}>
      <SimpleRoom />
    </RoomProvider>
  )
}
```

### Using y-presence react hooks

`@y-presence/react` comes with four hooks: `useOthers()`, `useUsers()`, `useSelf()`, and `useRoom()`.

- `useOthers()`:
  The `useOthers` hook returns an array of users that are currently connected in the room (excluding yourself). Each user object in the array contains the client/connection id and the presence information associated to the user.

  ```tsx
  import { useOthers } from '@y-presence/react'

  export default function Room() {
    const others = useOthers()

    return <p>Number of other users: {others.length}</p>
  }
  ```

- `useUsers()`:
  The `useUsers` hook returns an array of users that are currently connected in the room (including yourself). Each user object in the array contains the client/connection id and the presence information associated to the user.

  ```tsx
  import { useUsers } from '@y-presence/react'

  export default function Room() {
    const users = useUsers()

    return <p>Number of connected users: {users.length}</p>
  }
  ```

- `useSelf()`:

  The `useSelf` hook returns an object `self` containing information about the current user and a function `setPresence` to update the user's presence. The `useSelf` hook behaves similarly to the `useState` hook as calling the `setPresence` method causes a rerender and updates the `self` object. The `self` object contains the user client/connection id and a field to store a presence object. It looks like the following:

  ```ts
  User<T> = {
    id: number, // The client id associated to the user
    presence?: T // The user presence
  }
  ```

  **Example**:

  ```tsx
  import { useSelf } from '@y-presence/react'

  // Define the presence object (ignore if not typescript)
  type CursorPresence = {
    x: number
    y: number
  }

  export default function Room() {
    const { self, setPresence } = useSelf<CursorPresence>()

    React.useEffect(() => {
      setPresence({ x: 0, y: 0 })
    }, [])

    return (
      <div>
        <p>Client id: {self.id}</p>
        <p>Presence: {self.presence}</p>
      </div>
    )
  }
  ```

- `useRoom()`:
  The `useRoom` hook returns a `Room`, a thin wrapper around the provider awareness. This object provides helper methods to listen to various user events in a room. For more examples on how to use the `Room` object, check out [@y-presence/client](https://github.com/nimeshnayaju/y-presence/tree/main/packages/client).

  ```tsx
  import { useRoom } from '@y-presence/react'

  export default function Room() {
    const room = useRoom()
    const [numUsers, setNumUsers] = React.useState(1)

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
