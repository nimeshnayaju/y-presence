# @y-presence/client

Add presence (live cursors/avatars) to any web application.

## Installation

```bash
yarn add @y-presence/client
# or
npm i @y-presence/client
```

## Usage

This library exposes a `Room` object which wraps the provider's awareness to provide helper methods to listen to changes in self presence, other users' presence and all users' presence.

```ts
const room = new Room(provider.awareness)

// listen to changes in all users' presence
room.subscribe('users', (users) => {
  // do something
})
```
