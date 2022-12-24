# @y-presence/react

## 0.2.2

### Patch Changes

- Remove `yjs` from peer dependencies

## 0.2.1

### Patch Changes

- Make `selector` function optional for both `useUsers` and `useSelf` hooks

## 0.2.0

### Minor Changes

- Remove `createPresenceStore` and `usePresenceStore` in favour of simpler `useSelf` and `useUsers` hook that listen directly to `Awareness` object.

## 0.1.0

### Minor Changes

- Use `useSyncExternalStore` hook to manage awareness state in React
- Move `@y-presence/client` and `@y-presence/react` to `y-presence`.
- Export `createPresenceStore` and `usePresenceStore`.
