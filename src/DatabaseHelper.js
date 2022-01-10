import Chess from "chess.js"
import {Button, Col, Form, FormGroup, Input, Label, Spinner, Table} from "reactstrap"

export function loadDatabase(games){
  return new Promise((resolve, reject) => {
    var chessGames = []
    var currentGame = []
    var whiteSpace = 0

    for (var i=0; i<games.length; i++){
      var formattedGame = games[i].trim().replace(/(\r\n|\r|\n)/gm, "")
      currentGame.push(formattedGame)
      if (formattedGame == '')
        whiteSpace++

      if (whiteSpace == 2){
        const chess = new Chess()
        var loaded = chess.load_pgn(currentGame.join('\n'))

        chessGames.push(chess)
        currentGame = []
        whiteSpace = 0
      }
    }
    console.log("database loaded")
    console.log(chessGames.length)
    resolve(chessGames)
  })
}

export function ImportFromFileBodyComponent({setLoading, setTotalGames, setResultGames, setFoundPattern, setGame}) {
  let fileReader

  const handleFileRead = (e) => {
    const games = fileReader.result
    loadDatabase(games.split('\n'))
      .then((chessGames) => setTotalGames(chessGames))
      .then((res) => setLoading(false))
  }

  const handleFileChosen = (file) => {
    setLoading(true)
    setTotalGames([])
    setResultGames([])
    setFoundPattern(false)
    setGame({
      chessGame: null,
      board: new Chess().board()
    })

    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }

  return (
    <div className="uploadButton">
    <Form>
      <FormGroup row>
        <Label for="pgnFile">
          <h4>Subir base de datos PGN</h4>
        </Label>
        <Input
          id="pgnFile"
          type="file"
          name="file"
          onChange={e => handleFileChosen(e.target.files[0])}
          accept=".pgn"
        />
      </FormGroup>
    </Form>
    </div>
  )
}

export function DatabaseVisualizer({totalGames, setNewGame, setGame, loading}){
  return (
    <Col md={6}>
      <div className="baseDeDatos">
          <h3>Base de datos</h3>
          { loading ? <Spinner /> :
          <Table dark striped borderless>
            <thead><tr>
            <th>#</th>
            <th>White</th>
            <th>Elo</th>
            <th>Black</th>
            <th>Elo</th>
            <th>Result</th>
            <th>Accion</th>
            </tr></thead>

            <tbody>
              {
                totalGames.map((game, index) => {
                  const info = game.header()
                  return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{info.White == undefined ? "Unknown": info.White}</td>
                    <td>{info.WhiteElo == undefined ? "Unknown": info.WhiteElo}</td>
                    <td>{info.Black == undefined ? "Unknown": info.Black}</td>
                    <td>{info.BlackElo == undefined ? "Unknown": info.BlackElo}</td>
                    <td>{info.Result == undefined ? "Unknown": info.Result}</td>
                    <td>
                      <Button onClick={() => setNewGame(index, game, setGame)} color="primary">Ver</Button>
                    </td>
                  </tr>
                  )
                })
              }
            </tbody>
          </Table>
          }
      </div>
    </Col>
  )
}
