import { useState } from 'react'
import { Flex, Text, Button, Box, Card } from '@radix-ui/themes'
import { GAME_MODE, GAME_TYPE } from '../config/gamePhases.js'

function Menu({ onStart, state, dispatch }) {
  const [name, setName] = useState('')

  return (
    <Flex direction="column" gap="4" css={{ padding: 20 }}>
      <Text>Choose Game Mode</Text>
      <Box maxWidth="350px">
        <Card
          onClick={() => {
            dispatch({
              type: 'SET_GAME_TYPE',
              payload: GAME_TYPE.SINGLE_DEVICE,
            })
          }}
        >
          <Text as="div" size="2" weight="bold">
            Single Device
          </Text>
        </Card>
      </Box>
      <Box maxWidth="350px">
        <Card
          onClick={() => {
            dispatch({ type: 'SET_GAME_TYPE', payload: GAME_TYPE.MULTI_DEVICE })
          }}
        >
          <Text as="div" size="2" weight="bold">
            Multi Device
          </Text>
        </Card>
      </Box>
    </Flex>
  )
}

export default Menu
