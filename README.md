# y-presence

Easy way to add presence (live cursors/avatars) to your multiplayer application using Yjs.

## Installation

```bash
yarn add y-presence
# or
npm i y-presence
```

## Usage

See a simple live cursor example using y-presence here: [Codesandbox Example](https://codesandbox.io/s/y-presence-demo-bj2p2)

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
    <div className="App">
      <PresenceProvider awareness={awareness}>
        <Users />
      </PresenceProvider>
    </div>
  )
}
```

### Using y-presence react hooks

- `useOthers()`: Returns an array of each user's presence but yours
- `useSelf()`: Returns an object representing the current user and a method to update the user's presence

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
    <div className="App">
      <PresenceProvider awareness={awareness}>
        <Users />
      </PresenceProvider>
    </div>
  )
}

export const USER_NAMES = ["Bob Ross", "Mark Twain" ];

const name = USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)];

function Users() {
  const { self } = useSelf({name: name});
  const others = useOthers();

  return (
    <>
      <div>My name is: {self.presence.name}</div>
      <div>There are {others.length} other people here.</div>
    </>
  )
}
```

Credits to [@steveruizok](https://github.com/steveruizok)'s [perfect-cursor](https://codesandbox.io/s/u85tu)'s demo that inspired me to write this library and thanks to [Liveblocks](https://liveblocks.io/) implementation of their API for inspiring the code structure.
