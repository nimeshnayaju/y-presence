# @y-presence/react

Add presence (live cursors/avatars) to any react application using react hooks.

- Lightweight: 14.38kb gzipped

## Installation

```bash
yarn add @y-presence/react
# or
npm i @y-presence/react
```

## Usage

### Codesandbox demo/examples

For all the demos, you can open a new tab on your browser to observe how the presence updates in each example.

- Simple room: [Demo](https://7ll3u.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-simple-room-7ll3u)
- Live cursors: [Demo](https://bj2p2.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-live-cursors-bj2p2)
- Live avatars: [Demo](https://65xpc.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-live-avatars-65xpc)
- Live selection (Input form): [Demo](https://5gmzw.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-live-selections-5gmzw)
- Live selection (Toggle group): [Demo](https://5qp5w.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-toggle-selection-5qp5w)

### React

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

y-presence comes with four hooks: `useSelf()`, `useOthers()`, `useUsers()`, and `useRoom()`.

- `useSelf()`:

  The `useSelf` hook returns an object containing information about the current user (represented as `self`) and a function to update the user's presence. The `useSelf` hook behaves very similarly to the `useState` hook as calling the `setPresence` method causes a rerender and updates the `self` object.

  The `self` object contains the user client/connection id and a field to store a presence object. It looks like the following:

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
        Client id: {self.id}
        Presence: {self.presence}
      </div>
    )
  }
  ```

- `useOthers()`:
  The `useOthers` hook returns an array of users that are currently connected in the room (excluding yourself). Each user object in the array contains the client/connection id and the presence information associated to the user. The user object looks like the following:

  ```ts
  User<T> = {
    id: number, // The client id associated to the user
    presence?: T // The user presence
  }
  ```

  ```tsx
  @example
  import { useOthers } from "@y-presence/react";

  // Define the presence object (ignore if not typescript)
  type CursorPresence = {
    x: number;
    y: number;
  }

  export default function Room() {
    const others = useOthers<CursorPresence>();

      return (
        <>
          Number of other users: {others.length}
          others.map(({ id, presence }) => {
            if (!presence) return null;

            return <Cursor key={id} x={presence.x} y={presence.y} />
          })
        </>
      )

  }

  ```

- `useUsers()`:
  The `useUsers` hook returns an array of users that are currently connected in the room (including yourself). Each user object in the array contains the client/connection id and the presence information associated to the user. The user object looks like the following:

  ```ts
  User<T> = {
    id: number, // The client id associated to the user
    presence?: T // The user presence
  }
  ```

  ```tsx
  @example
  import { useUsers } from "@y-presence/react";

  // Define the presence object (ignore if not typescript)
  type CursorPresence = {
    x: number;
    y: number;
  }

  export default function Room() {
    const users = useUsers<CursorPresence>();

      return (
          <>
            Number of connected users: {users.length}
          </>
      )

  }

  ```

- `useRoom()`:
  The `useRoom` hook returns a `Room`, a thin wrapper around the provider awareness. This object provides helper methods to listen to various user events in a room.

  ```tsx
  @example
  import { useRoom } from "@y-presence/react";


  export default function Room() {
      const room = useRoom();
      const [numUsers, setNumUsers] = React.useState(0);

      React.useEffect(() => {
        room.subscribe("users", (users) => {
            setNumUsers(users.length);
        })
      }, [])

      return (
          <>
            Number of connected users: {numUsers}
          </>
      )
  }
  ```

## Credits

Huge thanks to [@steveruizok](https://github.com/steveruizok)'s [perfect-cursor](https://codesandbox.io/s/u85tu)'s demo that inspired me to write this library. The `useSelf` and `useOthers` react hooks are also very much inspired by [Liveblocks](https://liveblocks.io/)’s react implementation of their multiplayer API. Check out their implementation for an similar alternative solution.
