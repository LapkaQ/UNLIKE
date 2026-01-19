import { useContext } from 'react'
import { Flex, Text, Button, Box, Card } from '@radix-ui/themes'
import { GameContext } from '../../contexts/GameContext.jsx'
import { SCREEN, DEVICE_TYPE } from '../../config/gamePhases.js'

export default function DeviceTypeSelect() {
  const { dispatch } = useContext(GameContext)

  const handleSelectDevice = (deviceType) => {
    dispatch({ type: 'SET_DEVICE_TYPE', payload: deviceType })
    dispatch({ type: 'SET_SCREEN', payload: SCREEN.MODE_SELECT })
  }

  return (
    <Flex direction="column" gap="6" css={{ padding: 40 }}>
      <Text size="4">Choose how to play</Text>

      <Box maxWidth="400px">
        <Card
          onClick={() => handleSelectDevice(DEVICE_TYPE.SINGLE_DEVICE)}
          css={{ cursor: 'pointer' }}
        >
          <Text as="div" size="3" weight="bold">
            Single Device
          </Text>
          <Text as="div" size="2" css={{ marginTop: 8 }}>
            Play with friends on one screen
          </Text>
        </Card>
      </Box>

      <Box maxWidth="400px">
        <Card
          onClick={() => handleSelectDevice(DEVICE_TYPE.MULTI_DEVICE)}
          css={{ cursor: 'pointer' }}
        >
          <Text as="div" size="3" weight="bold">
            Multi Device
          </Text>
          <Text as="div" size="2" css={{ marginTop: 8 }}>
            Each player uses their own device
          </Text>
        </Card>
      </Box>

      <Button
        variant="soft"
        onClick={() =>
          dispatch({ type: 'SET_SCREEN', payload: SCREEN.MAIN_MENU })
        }
      >
        Back
      </Button>
    </Flex>
  )
}
