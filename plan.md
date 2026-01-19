- fazy gry enum:
  menu (wybor trybu)
  lobby (wpisywnioe imion)
  assigment (pokazywanie pytan/roli)
  game
  voting (optional)
  results (wyniki)

- stany gry (state object):

{
players: [
{
name: string,
role: string,
isDead: boolean,
}
],
gamePhase: GamePhase,
currentPlayerIndex: number,
currentQuestion: number,
questions: [
{
question: string,
answer: string,
role: string
}

    ],
    impostorId: number

}

- akcje:
  add_player
  start_game
  next_player (po zobaczeniu roli)
  sybmit_vote
  reset_game
