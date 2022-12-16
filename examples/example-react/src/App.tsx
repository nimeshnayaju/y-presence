import { useCallback } from "react";
import { User, createPresenceStore, usePresenceStore } from "y-presence";
import { WebsocketProvider } from "y-websocket";
import { Doc } from "yjs";

const doc = new Doc();

// Create a websocket provider
const provider = new WebsocketProvider(
  "wss://demos.yjs.dev",
  "example-react",
  doc
);

const awareness = provider.awareness;

interface Presence {
  name: string;
}

const store = createPresenceStore<Presence>(awareness, {
  name: ["John Doe", "Michael Derry", "Henry Calvin"][
    Math.floor(Math.random() * 3)
  ],
});

export default function App() {
  return (
    <>
      <Self />
      <hr />
      <Users />
    </>
  );
}

function Users() {
  const [users] = usePresenceStore(store, (users) => users);

  return (
    <div>
      <h2>Users: {users.length}</h2>
      {users.map((user) => {
        return (
          <div key={user.id}>
            {user.id}: <b>{user.presence.name}</b>
          </div>
        );
      })}
    </div>
  );
}

function Self() {
  const [user, setPresence] = usePresenceStore(
    store,
    (users) => users.filter((user) => user.id === store.awareness.clientID)[0],
    isUserEqual
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPresence({ name: event.target.value });
    },
    []
  );

  if (!user) return null;

  return (
    <div>
      <h2>Self: {user.id}</h2>
      <input value={user.presence.name} onChange={handleChange} />
    </div>
  );
}

const isUserEqual = (a: User<Presence>, b: User<Presence>) => {
  return a.id === b.id && a.presence.name === b.presence.name;
};
