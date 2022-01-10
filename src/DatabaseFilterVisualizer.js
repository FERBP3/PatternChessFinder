import {Button, Col, Spinner, Table} from "reactstrap"

export function DatabaseFilterVisualizer({loadingResult, resultGames, totalGames, setNewGame, setGame}){
  return (
    <Col md={6}>
      <div className="resultados">
        <h2>Resultados</h2>
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
            resultGames.map((indexGame) => {
              const info = totalGames[indexGame].header()
              return (
              <tr key={indexGame}>
                <td>{indexGame+1}</td>
                <td>{info.White}</td>
                <td>{info.WhiteElo == undefined ? "Unknown": info.WhiteElo}</td>
                <td>{info.Black}</td>
                <td>{info.BlackElo}</td>
                <td>{info.Result}</td>
                <td>
                  <Button onClick={() => setNewGame(indexGame, totalGames[indexGame], setGame)} color="primary">Ver</Button>
                </td>
              </tr>
              )
            })
          }
        </tbody>
        </Table>
      </div>
    </Col>
  )
}
