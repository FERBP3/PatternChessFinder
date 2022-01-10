import Chess from "chess.js"
import {Alert, Button, Col} from "reactstrap"
import Board from "./Board"
import * as searching from './searchingPatterns'

export function showNextMove(game, setGame, setFoundPattern, inputPattern){
  if (game.move == null || game.move == game.history.length-1)
    return

  var nextMove = game.move + 1
  game.chessGame.move(game.history[nextMove])
  setGame({
    id: game.id,
    chessGame: game.chessGame,
    history: game.history,
    move: nextMove,
    board: game.chessGame.board()
  })

  var found = searching.searchPatternOne(inputPattern, game.chessGame.fen())
  setFoundPattern(found)
}

export function showPreviousMove(game, setGame, setFoundPattern, inputPattern){
  if (game.move == null || game.move == -1)
    return

  var prevMove = game.move - 1
  game.chessGame.undo()
  setGame({
    id: game.id,
    chessGame: game.chessGame,
    history: game.history,
    move: prevMove,
    board: game.chessGame.board()
  })

  var found = searching.searchPatternOne(inputPattern, game.chessGame.fen())
  setFoundPattern(found)
}

export function setNewGame(id, newGame, setGame){
  var newChess = new Chess()
  setGame({
    id: id,
    chessGame: newChess,
    history: newGame.history({verbose: true}),
    move: -1,
    board: newChess.board()
  })
}

export function GameVisualizer({game, setGame, setFoundPattern, inputPattern, foundPattern}){
  return (
    <Col md={6}>
      <div className="board-container">
        <div>Partida Seleccionada: {game.id == -1 ? "Ninguna": game.id+1}</div>
        <Board board={game.board}/>
        <div className="controls">
          <Button
            className="previousMoveButton"
            onClick={() => showPreviousMove(game, setGame, setFoundPattern, inputPattern)}
            color="success">Previous move</Button>
          <Button
            onClick={() => showNextMove(game, setGame, setFoundPattern, inputPattern)}
            color="danger">Next move</Button>
        </div>
        <div className="patternAlert">
        {
          foundPattern ?
          <Alert color="success">Patrón encontrado</Alert>
          :
          <Alert color="info">Patrón no encontrado</Alert>
        }
        </div>
      </div>
    </Col>
  )
}
