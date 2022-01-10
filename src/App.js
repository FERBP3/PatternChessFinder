import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Col, Row, Spinner} from 'reactstrap'
import Chess from 'chess.js'
import alekhineGames from './games/AlekhineGames.pgn'
import {GameVisualizer, setNewGame} from './GameVisualizer';
import {PatternReader} from './PatternReader';
import {loadDatabase} from './DatabaseHelper';
import {DatabaseVisualizer, ImportFromFileBodyComponent} from './DatabaseHelper';
import {DatabaseFilterVisualizer} from './DatabaseFilterVisualizer';

function App() {
  const [totalGames, setTotalGames] = useState([])
  const [resultGames, setResultGames] = useState([])
  const [inputPattern, setInputPattern] = useState("")
  const [foundPattern, setFoundPattern] = useState(false)
  const [loading, setLoading] = useState(true)
  const [game, setGame] = useState({
    id: -1,
    chessGame: null,
    history: [],
    move: null,
    board: new Chess().board()
  })

  useEffect(() => {
    setLoading(true)
    fetch(alekhineGames)
      .then(games => games.text())
      .then((games) => {
        loadDatabase(games.split('\n'))
        .then((chessGames) => setTotalGames(chessGames))
        .then((res) => setLoading(false))
      })
  }, [])

  return (
    <div className="main">
      <h1>Pattern chess finder</h1>
    <Row>
      <GameVisualizer
        game={game}
        setGame={setGame}
        setFoundPattern={setFoundPattern}
        inputPattern={inputPattern}
        foundPattern={foundPattern}
      />

      <Col md={6}>
      <PatternReader
        inputPattern={inputPattern}
        setInputPattern={setInputPattern}
        totalGames={totalGames}
        setResultGames={setResultGames}
        setTotalGames={setTotalGames}
      />
      <ImportFromFileBodyComponent
          setLoading={setLoading}
          setTotalGames={setTotalGames}
          setResultGames={setResultGames}
          setInputPattern={setInputPattern}
          setFoundPattern={setFoundPattern}
          setGame={setGame}
      />
      </Col>
    </Row>


    <Row>
      <DatabaseVisualizer
        totalGames={totalGames}
        setNewGame={setNewGame}
        setGame={setGame}
        loading={loading}
      />

      <DatabaseFilterVisualizer
        resultGames={resultGames}
        totalGames={totalGames}
        setNewGame={setNewGame}
        setGame={setGame}
      />
    </Row>
    </div>
  );
}

export default App;
