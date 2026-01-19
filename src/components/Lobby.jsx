import { useContext, useState } from 'react'
import { Flex, Text, Button } from '@radix-ui/themes'
import { GameContext } from '../contexts/GameContext.jsx'
import { Cross1Icon } from '@radix-ui/react-icons'

function Lobby() {
  const { state, dispatch } = useContext(GameContext)
  const [name, setName] = useState('')
  return (
    <Flex direction="column" gap="4" css={{ padding: 20 }}>
      <input
        placeholder="Add player"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 8, fontSize: 16 }}
        d
      />
      <Button
        onClick={() => {
          dispatch({
            type: 'ADD_PLAYER',
            payload: { id: Date.now(), name },
          })
          setName('')
        }}
      >
        Add Player
      </Button>
      <Flex direction="column" gap="2">
        {state.players.map((player) => (
          <Flex key={player.id} align="center" gap="2">
            <Text>{player.name}</Text>
            <Cross1Icon
              onClick={() => {
                dispatch({
                  type: 'SET_PLAYERS',
                  payload: state.players.filter((p) => p.id !== player.id),
                })
              }}
            />
          </Flex>
        ))}
      </Flex>

      <Button onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'game' })}>
        Start Game
      </Button>
    </Flex>
  )
}

export default Lobby
