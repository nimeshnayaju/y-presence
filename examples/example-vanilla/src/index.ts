import { Room } from '@y-presence/client'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'
import './styles.css'

// Create the shared doc
const doc = new Y.Doc()

// Create a websocket provider
const provider = new WebsocketProvider('wss://demos.yjs.dev', 'y-presence-example-vanilla', doc)

// Create a y-presence room using provider awareness
const room = new Room(provider.awareness)

// get the app container element
const container = document.getElementById('app')

if (container) {
  container.innerHTML = 'Number of connected users: ' + room.getUsers().length
}

// listen to "users" event on the room
room.subscribe('users', (users) => {
  if (!container) return
  container.innerHTML = 'Number of connected users: ' + users.length
})
