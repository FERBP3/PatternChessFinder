import {useEffect, useState} from "react";
import {Button, Col, Form, FormGroup, Input, Label, Progress, Spinner} from "reactstrap";
import * as searching from './searchingPatterns'

export function PatternReader({inputPattern, setInputPattern, totalGames, setResultGames, setTotalGames}){
  const [statusProgress, setStatusProgress] = useState(0)

  useEffect(() => {
    if (statusProgress > 100)
      setStatusProgress(0)
  }, [statusProgress])

  async function processGames() {
    console.log("buscando patrón...")

    var resultIndexGames = []
    var pattern = inputPattern.split('\n')
    if (!searching.validPattern(pattern)){
      setResultGames([])
      return
    }

    pattern = searching.splitPattern(pattern)
    pattern.fixed = searching.readPattern(pattern.fixed)

    if (pattern.fixed.length == 0 && pattern.attacking.length == 0){
      setResultGames([])
      return
    }

    const step = 100/totalGames.length
    const promises = totalGames.map((game, index) =>
        searching.findPatternInGame(game, pattern)
        .then((found) => {
          setStatusProgress(prev => prev+step)
          if (found)
            resultIndexGames.push(index)
    }))
    await Promise.all(promises)
    console.log("busqueda finalizada")
    setResultGames(resultIndexGames)
    setStatusProgress(prev => 0)
  }

  return (
      <div className="inputPattern">
        <Form>
          <FormGroup row>
            <Label for="pattern"><h2>Escribe el patrón:</h2></Label>
              <Input
                type="textarea"
                name="pattern"
                id="pattern"
                rows={8}
                onChange={(e) => setInputPattern(e.target.value)} />
          </FormGroup>
        </Form>
        <div className="patternButton">
          <Button onClick={() => processGames()} color="success">Buscar patrón</Button>{"  "}
        </div>
        <div className="loader">
        <Progress value={statusProgress} striped/>
        </div>
      </div>
  )
}
