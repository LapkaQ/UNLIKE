import { useContext, useState } from 'react'
import { Flex, Text, Button, Box, Card } from '@radix-ui/themes'
import { GameContext } from '../../contexts/GameContext.jsx'

export default function Voting() {
  const { state, dispatch } = useContext(GameContext)
  const [gameEnded, setGameEnded] = useState(false)
  const [selectedImpostor, setSelectedImpostor] = useState(null)

  const handleEndGame = () => {
    setGameEnded(true)
  }

  const handleVote = (playerId) => {
    setSelectedImpostor(playerId)
  }

  if (gameEnded) {
    const impostor = state.players.find((p) => p.isImpostor)
    return (
      <Flex direction="column" gap="4" p="4">
        <Card>
          <Flex direction="column" gap="2">
            <Text size="5" weight="bold">
              Gra Skończona!
            </Text>
            <Text size="3">
              <strong>Impostor:</strong> {impostor?.name}
            </Text>
            <Text size="3">
              <strong>Pytanie Impostora:</strong> {impostor?.impostorQuestion}
            </Text>
          </Flex>
        </Card>
        <Button onClick={() => window.location.reload()}>Nowa Gra</Button>
      </Flex>
    )
  }

  return (
    <Flex direction="column" gap="4" p="4">
      <Text size="5" weight="bold">
        Głosowanie
      </Text>

      <Card>
        <Flex direction="column" gap="3">
          <Text size="4" weight="bold">
            {state.currentQuestion}
          </Text>

          <Flex direction="column" gap="2">
            {state.players.map((player) => (
              <Card
                key={player.id}
                style={{
                  cursor: 'pointer',
                  border:
                    selectedImpostor === player.id
                      ? '2px solid blue'
                      : '1px solid gray',
                  padding: '12px',
                }}
                onClick={() => handleVote(player.id)}
              >
                <Flex justify="between" align="center">
                  <Flex direction="column">
                    <Text weight="bold">{player.name}</Text>
                    <Text size="2">{player.answer}</Text>
                  </Flex>
                  <input
                    type="radio"
                    name="impostor"
                    checked={selectedImpostor === player.id}
                    onChange={() => handleVote(player.id)}
                  />
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Card>

      <Button onClick={handleEndGame} style={{ marginTop: '20px' }}>
        Zakończ Grę
      </Button>
    </Flex>
  )
}
