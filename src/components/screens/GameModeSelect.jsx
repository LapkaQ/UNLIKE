import { useContext } from 'react'
import { Flex, Text, Button, Box, Card } from '@radix-ui/themes'
import { GameContext } from '../../contexts/GameContext.jsx'
import { SCREEN, GAME_MODE } from '../../config/gamePhases.js'

const MODES = [
  {
    id: GAME_MODE.SAME_QUESTION,
    label: 'Same Question',
    description: 'All players answer the same question',
  },
  {
    id: GAME_MODE.DIFFERENT_QUESTION,
    label: 'Different Questions',
    description: 'Each player gets a different question',
  },
  {
    id: GAME_MODE.IMPOSTOR,
    label: 'Impostor',
    description: "Find who doesn't belong",
  },
]

export default function GameModeSelect() {
  const { state, dispatch } = useContext(GameContext)

  const handleSelectMode = (modeId) => {
    dispatch({ type: 'SET_GAME_MODE', payload: modeId })
    dispatch({ type: 'SET_SCREEN', payload: SCREEN.LOBBY })
  }

  return (
    <Flex direction="column" gap="6" css={{ padding: 40 }}>
      <Text size="4">Choose game mode</Text>
      <Text size="2" color="gray">
        Playing on {state.selectedDeviceType}
      </Text>

      {MODES.map((mode) => (
        <Box key={mode.id} maxWidth="400px">
          <Card
            onClick={() => handleSelectMode(mode.id)}
            css={{ cursor: 'pointer' }}
          >
            <Text as="div" size="3" weight="bold">
              {mode.label}
            </Text>
            <Text as="div" size="2" css={{ marginTop: 8 }}>
              {mode.description}
            </Text>
          </Card>
        </Box>
      ))}

      <Button
        variant="soft"
        onClick={() =>
          dispatch({ type: 'SET_SCREEN', payload: SCREEN.DEVICE_SELECT })
        }
      >
        Back
      </Button>
    </Flex>
  )
}
