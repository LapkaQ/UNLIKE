import { useContext } from 'react'
import { Text } from '@radix-ui/themes'
import { GameContext } from './contexts/GameContext.jsx'
import { SCREEN } from './config/gamePhases.js'

// Screens
import MainMenu from './components/screens/MainMenu.jsx'
import DeviceTypeSelect from './components/screens/DeviceTypeSelect.jsx'
import GameModeSelect from './components/screens/GameModeSelect.jsx'
import Lobby from './components/Lobby.jsx'

function App() {
  const ctx = useContext(GameContext)
  if (!ctx) return <Text>Loading...</Text>

  const { state } = ctx

  switch (state.currentScreen) {
    case SCREEN.MAIN_MENU:
      return <MainMenu />
    case SCREEN.DEVICE_SELECT:
      return <DeviceTypeSelect />
    case SCREEN.MODE_SELECT:
      return <GameModeSelect />
    case SCREEN.LOBBY:
      return <Lobby />
    case SCREEN.GAME:
      return <Text>Game screen - coming soon</Text>
    default:
      return <Text>Unknown screen</Text>
  }
}

export default App
