import { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'
import questionsData from '../../assets/questions.json'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  Separator,
  Badge,
} from '@radix-ui/themes'
import {
  EyeOpenIcon,
  EyeNoneIcon,
  PersonIcon,
  RocketIcon,
} from '@radix-ui/react-icons'

export default function Assignment() {
  const { state, dispatch } = useContext(GameContext)

  // Stan lokalny dla logiki przydzielania ról
  const [assignments, setAssignments] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0) // Który gracz teraz patrzy?
  const [isRoleVisible, setIsRoleVisible] = useState(false) // Czy rola jest odsłonięta?
  const [isFinished, setIsFinished] = useState(false) // Czy wszyscy już zobaczyli?

  // 1. Logika losowania (uruchamia się TYLKO RAZ po zamontowaniu)
  useEffect(() => {
    if (!state.players || state.players.length === 0) return

    const players = state.players
    // Losujemy impostora
    const impostorIndex = Math.floor(Math.random() * players.length)
    // Losujemy zestaw pytań
    const questionSet =
      questionsData[Math.floor(Math.random() * questionsData.length)]

    console.log('DEBUG: Impostor is player index:', impostorIndex)
    console.log('DEBUG: Question Set:', questionSet)

    // Tworzymy stałą tablicę przypisań
    const newAssignments = players.map((player, idx) => ({
      player,
      // Jeśli to impostor, dostaje pytanie dla impostora (lub puste/inne instrukcje), inni dostają zwykłe
      question:
        idx === impostorIndex ? questionSet.impostor : questionSet.question,
      isImpostor: idx === impostorIndex,
    }))

    setAssignments(newAssignments)
  }, [state.players])

  // Funkcja obsługująca przejście do następnego gracza
  const handleNext = () => {
    setIsRoleVisible(false) // Ukryj rolę dla bezpieczeństwa
    if (currentIndex < assignments.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  // Funkcja startu gry
  const handleStartGame = () => {
    console.log('Game Started!')
    dispatch({ type: 'SET_GAME_PHASE', payload: 'voting' })
    // Tutaj prawdopodobnie chcesz zmienić fazę w kontekście
    // dispatch({ type: 'START_GAME' })
  }

  // Loading state jeśli dane się jeszcze nie przetworzyły
  if (assignments.length === 0) {
    return (
      <Container size="1">
        <Text>Ładowanie gry...</Text>
      </Container>
    )
  }

  // Widok końcowy (po rozdaniu wszystkich ról)
  if (isFinished) {
    return (
      <Container size="1" p="4">
        <Card size="4" style={{ textAlign: 'center' }}>
          <Flex direction="column" gap="5" align="center">
            <RocketIcon width="40" height="40" color="var(--accent-9)" />
            <Heading size="6">Wszyscy gotowi?</Heading>
            <Text color="gray" size="3">
              Wszyscy gracze poznali swoje role. Czas rozpocząć rozgrywkę!
            </Text>
            <Button
              size="4"
              onClick={handleStartGame}
              style={{ width: '100%' }}
            >
              Rozpocznij Grę
            </Button>
          </Flex>
        </Card>
      </Container>
    )
  }

  const currentAssignment = assignments[currentIndex]

  // Widok rozdawania ról
  return (
    <Container size="1" p="4">
      <Flex
        direction="column"
        gap="4"
        align="center"
        style={{ minHeight: '60vh', justifyContent: 'center' }}
      >
        {/* Informacja o turze */}
        <Badge variant="soft" color="gray">
          Gracz {currentIndex + 1} z {assignments.length}
        </Badge>

        <Card size="4" style={{ width: '100%', maxWidth: '400px' }}>
          <Flex direction="column" gap="4">
            <Flex align="center" gap="3">
              <PersonIcon width="24" height="24" />
              <Heading size="5">{currentAssignment.player.name}</Heading>
            </Flex>

            <Separator size="4" />

            {/* Sekcja ukryta/odkryta */}
            <Box
              style={{
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!isRoleVisible ? (
                <Flex direction="column" align="center" gap="2">
                  <Text align="center" color="gray">
                    Przekaż telefon temu graczowi.
                  </Text>
                  <Text align="center" weight="bold">
                    Naciśnij oko, aby odkryć rolę.
                  </Text>
                </Flex>
              ) : (
                <Flex
                  direction="column"
                  align="center"
                  gap="2"
                  style={{ animation: 'fadeIn 0.3s' }}
                >
                  <Text
                    size="1"
                    color="gray"
                    transform="uppercase"
                    weight="bold"
                  >
                    Twoje zadanie:
                  </Text>
                  <Heading size="6" align="center" color="indigo">
                    {currentAssignment.question}
                  </Heading>
                </Flex>
              )}
            </Box>

            <Separator size="4" />

            {/* Przyciski akcji */}
            <Flex gap="3" direction="column">
              <Button
                variant={isRoleVisible ? 'soft' : 'solid'}
                onClick={() => setIsRoleVisible(!isRoleVisible)}
                size="3"
              >
                {isRoleVisible ? (
                  <>
                    <EyeNoneIcon /> Ukryj
                  </>
                ) : (
                  <>
                    <EyeOpenIcon /> Pokaż rolę
                  </>
                )}
              </Button>

              {isRoleVisible && (
                <Button
                  variant="solid"
                  color="green"
                  size="3"
                  onClick={handleNext}
                >
                  {currentIndex === assignments.length - 1
                    ? 'Gotowe'
                    : 'Następny gracz'}
                </Button>
              )}
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Container>
  )
}
