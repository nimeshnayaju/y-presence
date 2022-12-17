import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector";
import { type Awareness } from "y-protocols/awareness";

export function useSelf<Selection>(
  awareness: Awareness,
  selector: (state: ReturnType<Awareness["getLocalState"]>) => Selection,
  compare?: (a: Selection, b: Selection) => boolean
): Selection {
  const state = useSyncExternalStoreWithSelector(
    (callback) => subscribe(awareness, callback),
    () => getSnapshot(awareness),
    () => getSnapshot(awareness),
    selector,
    compare
  );

  return state;
}

function subscribe(awareness: Awareness, callback: () => void) {
  const onChange = (_: any, origin: any) => {
    if (typeof origin === "string" && origin === "local") {
      callback();
    }
  };

  awareness.on("change", onChange);
  return () => awareness.off("change", onChange);
}

function getSnapshot(awareness: Awareness) {
  return awareness.getLocalState();
}
