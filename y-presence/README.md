# y-presence

Easy way to add presence (live cursors/avatars) to your multiplayer application using Yjs.

## Installation

```bash
yarn add y-presence
# or
npm i y-presence
```

## Usage

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
