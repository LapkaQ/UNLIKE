import { Flex, Text, Button, Card } from '@radix-ui/themes'
import { GAME_PHASES, GAME_MODE } from '../config/gamePhases.js'

export default function ModeSelection({ state, dispatch }) {
  return (
    <Flex direction="column" gap="4" css={{ padding: 20 }}>
      <Card>
        <Text size="3">Mode selected: {state.gameType || '—'}</Text>
      </Card>

      <Button
        onClick={() => {
          dispatch({ type: 'SET_GAME_PHASE', payload: GAME_PHASES.LOBBY })
          dispatch({ type: 'SET_GAME_MODE', payload: GAME_MODE.MENU })
        }}
      >
        Proceed to lobby
      </Button>
    </Flex>
  )
}
