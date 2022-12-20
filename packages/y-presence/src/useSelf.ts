import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector";
import { Awareness } from "y-protocols/awareness";

type UserSnapshot = ReturnType<Awareness["getLocalState"]>;

export function useSelf(awareness: Awareness): UserSnapshot;

export function useSelf<Selection>(
  awareness: Awareness,
  selector: (state: UserSnapshot) => Selection,
  compare?: (a: Selection, b: Selection) => boolean
): Selection;

export function useSelf<Selection>(
  awareness: Awareness,
  selector: (state: UserSnapshot) => Selection = (state) => state as Selection,
  compare?: (a: Selection, b: Selection) => boolean
) {
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
