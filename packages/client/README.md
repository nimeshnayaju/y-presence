# @y-presence/client

Add presence (live cursors/avatars) to any web application.

- Lightweight: 8.74kb gzipped

## Codesandbox demo/examples

### Vue.js

- Simple room: [Demo](https://2knp0l.sse.codesandbox.io/) | [Code](https://codesandbox.io/s/2knp0l)

### Svelte

- Multiplayer avatars: [Demo](https://t7llhs.csb.app/) | [Code](https://codesandbox.io/s/t7llhs)
- Simple room: [Demo](https://7qsg6f.csb.app/) | [Code](https://codesandbox.io/s/7qsg6f)

### Other examples/integrations:

- tldraw: [Demo](https://opuwd.csb.app/) | [Code](https://codesandbox.io/s/opuwd)

[![Edit y-presence](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/t7llhs)

## Installation

```bash
yarn add @y-presence/client
# or
npm i @y-presence/client
```

## Usage

This library exposes a `Room` object which wraps the provider's awareness to provide helper methods to listen to changes in self presence, other users' presence and all users' presence.

```ts
// Define your presence object here
interface AppPresence {
  name: string
  color: string
}

// Define your initial app presence
const initialPresence: AppPresence = { name: 'John Doe', color: 'Blue' }

const room = new Room<AppPresence>(provider.awareness, initialPresence)

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

// Updates only the color of the current user's presence object
room.updatePresence({ color: 'Red' })

// Overrides the entire presence objecct of the current user in a single transaction
room.setPresence({ name: 'Jane Doe', color: 'red' })
```

### License

This project is licensed under MIT.

## Author

- [@nayajunimesh](https://twitter.com/nayajunimesh)
