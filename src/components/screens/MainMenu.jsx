import { useContext } from 'react'
import { Flex, Text, Button, Box, Card } from '@radix-ui/themes'
import { GameContext } from '../../contexts/GameContext.jsx'
import { SCREEN } from '../../config/gamePhases.js'

export default function MainMenu() {
  const { dispatch } = useContext(GameContext)

  return (
    <Flex direction="column" gap="6" css={{ padding: 40 }}>
      <Text size="5" weight="bold">
        UNLIKE
      </Text>
      <Text size="3">Select a game type to continue</Text>

      <Button
        size="3"
        onClick={() =>
          dispatch({ type: 'SET_SCREEN', payload: SCREEN.DEVICE_SELECT })
        }
      >
        Start Game
      </Button>
    </Flex>
  )
}
