# y-presence

Easy way to add presence (live cursors/avatars) to your multiplayer application using Yjs.

## Installation

```bash
yarn add y-presence
# or
npm i y-presence
```

## Usage

### Codesandbox demo/examples

For all the demos, you can open a different tab(s) in your browser to observe how user presence updates when someone enters a room.

- Simple room: [Demo](https://7ll3u.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-simple-room-7ll3u)
- Live cursors: [Demo](https://bj2p2.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-live-cursors-bj2p2)
- Live avatars: [Demo](https://65xpc.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-live-avatars-65xpc)
- Live selection: [Demo](https://5gmzw.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-live-selections-5gmzw)

### Using PresenceProvider

Wrap the components you'd like to provide access to `y-presence` hooks inside `PresenceProvider` in your React application.

```tsx
// src/app.js

import * as Y from 'yjs'
import { PresenceProvider } from 'y-presence'

// Create the shared doc (from Yjs)
const doc = new Y.Doc()

// Create a provider
const provider = ...

// Get the provider's awareness API
const awareness = provider.awareness

export default function App() {
  return (
    <PresenceProvider awareness={awareness}>
      <SimpleRoom />
    </PresenceProvider>
  )
}
```

### Using y-presence react hooks

y-presence comes with two hooks: `useSelf()` and `useOthers()` that are used to get information about self and other users connected in the room.

```tsx
// src/app.js

import { useOthers, PresenceProvider } from 'y-presence'

...

export default function App() {
  return (
    <PresenceProvider awareness={awareness}>
      <SimpleRoom />
    </PresenceProvider>
  )
}

function SimpleRoom() {
  const others = useOthers()

  return <>There are currently {others.length} other people in the room.</>
}
```

### y-presence react hooks

- `useSelf()`:
  The useSelf hook accepts an initial presence object and returns an object containing information
  about the current user (represented as `self`) and a function to update the user's presence. The update function doesn't require the full presence object to update it. You may only send the
  presence properties that you'd like changed in the presence.

  The `self` object contains the user client/connection id and a field to store a presence object.
  It looks like the following:

  ```ts
  User<T> = {
    id: number, // The client id associated to the user
    presence?: T // The user presence
  }
  ```

  **Example**:

  ```tsx
  import { useSelf } from 'y-presence'

  // Define the presence object (ignore if not typescript)
  type CursorPresence = {
    x: number
    y: number
  }

  export default function Room() {
    const { self, updatePresence } = useSelf<CursorPresence>({
      x: 0,
      y: 0,
    })

    // updatePresence doesn't require the full presence object
    updatePresence({ x: 1 })

    updatePresence({ y: 2 })

    return (
      <>
        Client id: {self.id}
        Presence: {self.presence}
      </>
    )
  }
  ```

- `useOthers()`:
  The useOthers hook returns an array of users that are currently connected in the room
  (excluding yourself). Each user object in the array contains the client/connection id
  and the presence information associated to the user. The user object looks like the
  following:

  ```ts
  User<T> = {
    id: number, // The client id associated to the user
    presence?: T // The user presence
  }
  ```

  **Example**

  ```tsx
  import { useOthers } from "y-presence";

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

## Credits

Huge thanks to [@steveruizok](https://github.com/steveruizok)'s [perfect-cursor](https://codesandbox.io/s/u85tu)'s demo that inspired me to write this library and thanks to [Liveblocks](https://liveblocks.io/) implementation of their API for inspiring the code structure.
