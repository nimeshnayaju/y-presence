import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector";
import { type createPresenceStore } from "./store";
import { Presence } from "./types";

export function usePresenceStore<T extends Presence, Selection>(
  store: ReturnType<typeof createPresenceStore<T>>,
  selector: (state: ReturnType<typeof store.getSnapshot>) => Selection,
  equalityFn?: (a: Selection, b: Selection) => boolean
): [Selection, typeof store.setPresence] {
  const state = useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot,
    selector,
    equalityFn
  );

  return [state, store.setPresence];
}
