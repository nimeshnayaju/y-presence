# @y-presence/client

Add presence (live cursors/avatars) to any web application.

- Lightweight: 6.08kb gzipped

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

// Set the current user's presence
room.setPresence({ name: 'John Doe' })

// listen to changes in all users' presence
room.subscribe('users', (users) => {
  // do something
})

// listen to changes in other users' presence
room.subscribe('others', (others) => {
  // do something
})

// listen to changes in self presence
room.subscribe('self', (user) => {
  // do something
})
```
