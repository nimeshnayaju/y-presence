import { RoomProvider } from '@y-presence/react'
import './App.css'
import Room from './components/Room'
import { awareness } from './store'

function App() {
  return (
    <div className="App">
      <RoomProvider awareness={awareness}>
        <Room />
      </RoomProvider>
    </div>
  )
}

export default App
