import { useCallback, useRef } from "react";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector";
import { type Awareness } from "y-protocols/awareness";

type UsersSnapshot = ReturnType<Awareness["getStates"]>;

export function useUsers(awareness: Awareness): UsersSnapshot;

export function useUsers<Selection>(
  awareness: Awareness,
  selector: (state: UsersSnapshot) => Selection,
  compare?: (a: Selection, b: Selection) => boolean
): Selection;

export function useUsers<Selection>(
  awareness: Awareness,
  selector: (state: UsersSnapshot) => Selection = (state) => state as Selection,
  compare?: (a: Selection, b: Selection) => boolean
): Selection {
  const stateRef = useRef<ReturnType<Awareness["getStates"]>>();

  if (!stateRef.current) {
    stateRef.current = new Map(awareness.getStates());
  }

  const getSnapshot = useCallback(() => {
    if (!stateRef.current) return new Map();
    return stateRef.current;
  }, []);

  const state = useSyncExternalStoreWithSelector(
    (callback) => subscribe(awareness, callback),
    getSnapshot,
    getSnapshot,
    selector,
    compare
  );

  const subscribe = useCallback(
    (awareness: Awareness, callback: () => void) => {
      const onChange = () => {
        stateRef.current = new Map(awareness.getStates());
        callback();
      };

      awareness.on("change", onChange);
      return () => awareness.off("change", onChange);
    },
    []
  );

  return state;
}
