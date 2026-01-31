import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../contexts/GameContext";
import questionsData from "../../assets/questions.json";
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
  TextField,
} from "@radix-ui/themes";
import {
  EyeOpenIcon,
  EyeNoneIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
const Assigment2 = () => {
  const { state, dispatch } = useContext(GameContext);
  const [assignments, setAssignments] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  console.log(state);
  useEffect(() => {
    if (!state.players || state.players.length === 0) return;
    const players = state.players;
    const impostorIndex = Math.floor(Math.random() * players.length);
    const questionSet =
      questionsData[Math.floor(Math.random() * questionsData.length)];

    console.log("DEBUG: Impostor is player index:", impostorIndex);
    console.log("DEBUG: Question Set:", questionSet);

    const newAssignments = players.map((player, idx) => ({
      player,
      question:
        idx === impostorIndex ? questionSet.impostor : questionSet.question,
      isImpostor: idx === impostorIndex,
    }));

    setAssignments(newAssignments);
    console.log("Assignments:", newAssignments);
  }, [state.players]);
  return (
    <>
      {/* <div>
        {assignments.length > 0 &&
          assignments.map((assignment, idx) => (
            <Card key={idx} css={{ padding: 20, marginBottom: 10 }}>
              <Flex direction="column" gap="10">
                <Heading size="4">{assignment.player.name}</Heading>
                <Text>{assignment.question}</Text>
                <Badge variant="green">
                  {assignment.isImpostor ? "Impostor" : "Crewmate"}
                </Badge>
              </Flex>
            </Card>
          ))}
      </div> */}
      <div>
        <Separator css={{ margin: "20px 0" }} />
        <Card key="ess" css={{ padding: 20, marginBottom: 10 }}>
          <Flex direction="column" gap="10">
            <Heading size="4">
              {assignments[currentPlayerIndex]?.player.name}
            </Heading>
            <Text>{assignments[currentPlayerIndex]?.question}</Text>
            <Badge variant="green">
              {assignments[currentPlayerIndex]?.isImpostor
                ? "Impostor"
                : "Crewmate"}
            </Badge>
            <input
              placeholder="Add player"
              value={answers[currentPlayerIndex] || ""}
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  [currentPlayerIndex]: e.target.value,
                }))
              }
              style={{ padding: 8, fontSize: 16 }}
            />
          </Flex>
          <Button
            css={{ marginTop: 20 }}
            onClick={() => {
              if (currentPlayerIndex < assignments.length - 1) {
                setCurrentPlayerIndex((prev) => prev + 1);
              } else {
                const updatedPlayers = assignments.map((assignment, idx) => ({
                  ...assignment.player,
                  isImpostor: assignment.isImpostor,
                  answer: answers[idx] || "",
                  impostorQuestion: assignment.isImpostor
                    ? assignment.question
                    : undefined,
                }));

                const currentQ =
                  assignments.find((a) => !a.isImpostor)?.question ||
                  assignments[0]?.question ||
                  null;

                dispatch({ type: "SET_PLAYERS", payload: updatedPlayers });
                dispatch({ type: "SET_CURRENT_QUESTION", payload: currentQ });
                dispatch({ type: "SET_GAME_PHASE", payload: "voting" });
              }
            }}
          >
            {currentPlayerIndex < assignments.length - 1
              ? "Next Player"
              : "Start Voting Phase"}
          </Button>
        </Card>
      </div>
    </>
  );
};

export default Assigment2;
