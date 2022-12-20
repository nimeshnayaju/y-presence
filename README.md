# y-presence

Implement and manage presence/awareness using [Yjs](https://github.com/yjs/yjs) in any React application using two simple React hooks: `useSelf` and `useUsers`.

## Codesandbox demo/examples

For all the demos, you can open a new tab on your browser to observe how the presence updates in each example.

- Multiplayer avatars: [Demo](https://65xpc.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-live-avatars-65xpc)
- Multiplayer cursors: [Demo](https://bj2p2.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-live-cursors-bj2p2)
- Simple room: [Demo](https://7ll3u.csb.app/) | [Code](https://codesandbox.io/s/y-presence-demo-simple-room-7ll3u)

### Other examples/integrations:

- perfect-cursors: [Demo](https://9ej521.csb.app/) | [Code](https://codesandbox.io/s/9ej521)

[![Edit y-presence](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/y-presence-demo-live-avatars-65xpc)

## Recommended Reading

- [API documentation of the Awareness CRDT](https://docs.yjs.dev/api/about-awareness#awareness-protocol-api)

## Usage

### Installation

```bash
yarn add y-presence
# or
npm i y-presence
```

### Set up a shared Yjs document and connection provider

```tsx
// src/store.ts
import { WebsocketProvider } from "y-websocket";
import { Doc } from "yjs";

// Create the shared doc (from Yjs)
const doc = new Doc();

// Create a provider
const provider = new WebsocketProvider(
  "wss://demos.yjs.dev",
  "y-presence-demo",
  doc
);

// Get the provider's awareness API
export const awareness = provider.awareness;

// Set the local awareness state
awareness.setLocalState({ name: "John Doe", email: "johndoe@gmail.com" });
```

### Manage the presence/awareness state in React components

```tsx
// src/App.tsx

import { useUsers } from "y-presence";
import { awareness } from "./store.ts";

export default function App() {
  // Fetch all users connected in the room
  const users = useSelf(awareness);

  return <div>Number of connected users: {users.size}</div>;
}
```

## Hooks

### `useUsers`

The `useUsers` hook subscribes to updates to the awareness states of all users connected in the room. It accepts three arguments:

1. An awareness object returned by connection provider.
2. (Optional) A selector function that accepts a map of the awareness states and enables selecting a subset of this map. This signals React to rerender the component only when this subset has changed.
3. (Optional) A equality function to detect if the selected subset has changed.

#### Example Usage:

```tsx
// Returns a map of the client id to their awareness state and rerenders when any such awareness state changes
const users = useUsers(awareness);
// equivalent to:
const users = useUsers(awareness, (state) => state);
// Map {
//    3965141439 => { name: "John Doe", email: "johndoe@gmail.com" }
// }

// Returns the number of users connected in the room and rerenders when this number changes
const size = useUsers(awareness, (state) => state.size);
// 1

// Returns the awareness state of the current user (self) and rerenders when this state changes. A simpler/optimized hook for this use case is also provided, and is discussed below:
const self = useUsers(awareness, (state) => state.get(awareness.clientId));
// {
//    name: "John Doe",
//    email: "johndoe@gmail.com"
// }
```

### `useSelf`

The `useSelf` hook subscribes to updates to the awareness state of the current user (self) in the room. It accepts three arguments:

1. An awareness object returned by connection provider.
2. (Optional) A selector function that accepts an awareness state object and enables selecting a subset of this object. This signals React to rerender the component only when this subset has changed.
3. (Optional) A equality function to detect if the selected subset has changed.

#### Example Usage:

```tsx
// Returns the awareness state of the current user (self) and rerenders when this state changes.
const self = useSelf(awareness);
// is equivalent to:
const self = useSelf(awareness, (state) => state);
// {
//    name: "John Doe",
//    email: "johndoe@gmail.com"
// }

// Returns the value of the property `name` of the current user's awareness state and rerenders when this value changes
const name = useSelf(awareness, (state) => state?.name);
// "John Doe"
```

### License

This project is licensed under MIT.

### Credits

The two hooks are inspired by the Liveblocks' Presence hooks. Check out their [website](https://liveblocks.io/) and [documentation](https://liveblocks.io/docs) to learn more about their presence/awareness implementation.

## Author

- [@nayajunimesh](https://twitter.com/nayajunimesh)
