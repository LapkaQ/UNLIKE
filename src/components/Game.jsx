import { useContext } from "react";
import { Flex, Text, Button, Box, Card } from "@radix-ui/themes";
import { GameContext } from ".././contexts/GameContext.jsx";
import Assignment from "./phases/Assigment.jsx";
import Assigment2 from "./phases/Assigment2.jsx";
import Voting from "./phases/Voting.jsx";
export default function Game() {
  const { state, dispatch } = useContext(GameContext);
  console.log(state);

  switch (state.currentGamePhase) {
    case "assignment":
      return <Assigment2 />;
    case "game":
      return <div>Game Phase</div>;
    case "voting":
      return <Voting />;
    default:
      return <div>Unknown Game Phase</div>;
  }
  return <div>Game Component</div>;
}
