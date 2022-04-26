# @y-presence/client

Add presence (live cursors/avatars) to any web application.

- Lightweight: 7.16kb gzipped

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

### License

This project is licensed under MIT.

## Author

- [@nayajunimesh](https://twitter.com/nayajunimesh)
