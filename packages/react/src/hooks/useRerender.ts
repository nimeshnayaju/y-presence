import { useReducer } from 'react'

export default function useRerender() {
  const [_, update] = useReducer((x: number): number => x + 1, 0)
  return update
}
