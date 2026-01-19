import { createContext, useReducer } from 'react'
import { SCREEN, DEVICE_TYPE, GAME_MODE } from '../config/gamePhases'
export const GameContext = createContext(null)

const initialState = {
  // Navigation
  currentScreen: SCREEN.MAIN_MENU,

  // Settings
  selectedDeviceType: null,
  selectedGameMode: null,

  // Game state
  players: [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
  ],
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload }
    case 'SET_DEVICE_TYPE':
      return { ...state, selectedDeviceType: action.payload }
    case 'SET_GAME_MODE':
      return { ...state, selectedGameMode: action.payload }
    case 'SET_PLAYERS':
      return { ...state, players: action.payload }
    case 'ADD_PLAYER':
      return { ...state, players: [...state.players, action.payload] }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}
