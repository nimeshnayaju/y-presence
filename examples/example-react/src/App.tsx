import { useCallback } from "react";
import { useSelf, useUsers } from "y-presence";
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

awareness.setLocalState({ name: "John Doe", email: "johndoe@gmail.com" });

export default function App() {
  return (
    <>
      <All />
      <Self />
    </>
  );
}

function All() {
  const users = useUsers(awareness);

  return (
    <div>
      <h2>All Users: {users.size}</h2>
      {Array.from(users.entries()).map(([key, value]) => {
        return <div key={key}>{value.name}</div>;
      })}
    </div>
  );
}

function Self() {
  const state = useSelf(awareness, (state) => {
    if (state) {
      return state.name as string;
    }
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      awareness.setLocalStateField("name", event.target.value);
    },
    []
  );

  return (
    <div>
      <h2>Self: {awareness.clientID}</h2>
      <input value={state ?? ""} onChange={handleChange} />
    </div>
  );
}
