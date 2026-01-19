import { Flex, Text, Button, Box, Card } from '@radix-ui/themes'
import { GAME_MODE, GAME_TYPE } from '../config/gamePhases.js'

const GAME_MODES_MAP = {
  [GAME_TYPE.SINGLE_DEVICE]: [
    { label: 'Same Question', value: GAME_MODE.SAME_QUESTION },
    { label: 'Different Question', value: GAME_MODE.DIFFERENT_QUESTION },
    { label: 'Impostor', value: GAME_MODE.IMPOSTOR },
  ],
  [GAME_TYPE.MULTI_DEVICE]: [{ label: 'Impostor', value: GAME_MODE.IMPOSTOR }],
}

export default function GameModeSelection({ state, dispatch }) {
  const modes = GAME_MODES_MAP[state.gameType] || []

  return (
    <Flex direction="column" gap="4" css={{ padding: 20 }}>
      <Text size="3">Select a game mode for {state.gameType}</Text>

      {modes.map((mode) => (
        <Box key={mode.value} maxWidth="350px">
          <Card
            onClick={() =>
              dispatch({ type: 'SET_GAME_MODE', payload: mode.value })
            }
          >
            <Text as="div" size="2" weight="bold">
              {mode.label}
            </Text>
          </Card>
        </Box>
      ))}

      <Button
        onClick={() => {
          dispatch({ type: 'SET_GAME_TYPE', payload: null })
          dispatch({ type: 'SET_GAME_MODE', payload: GAME_MODE.MENU })
        }}
      >
        Back
      </Button>
    </Flex>
  )
}
