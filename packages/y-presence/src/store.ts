import { type Awareness } from "y-protocols/awareness";
import { Presence, User } from "./types";

export function createPresenceStore<T extends Presence>(
  awareness: Awareness,
  initialPresence: T
) {
  const subscribers = new Set<() => void>();

  let state: ReturnType<typeof getUsers>;

  awareness.on("change", () => {
    state = getUsers();

    subscribers.forEach((callback) => callback());
  });

  setPresence(initialPresence);

  state = getUsers();

  function destroy(): void {
    awareness.destroy();
  }

  function getUsers(): Readonly<User<T>[]> {
    const users: User<T>[] = [];

    awareness.getStates().forEach((presence, id) => {
      users.push({ id: id, presence: presence as T });
    });

    return users;
  }

  function setPresence(presence: T): void {
    awareness.setLocalState(presence);
  }

  function subscribe(callback: () => void): () => void {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  }

  return {
    awareness,
    getSnapshot: () => state,
    setPresence,
    subscribe,
    destroy,
  };
}
