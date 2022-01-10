import Chess from "chess.js";
import {useEffect, useState} from "react";
import {Button, Col, Form, FormGroup, Input, Label, Progress, Spinner} from "reactstrap";
import * as searching from './searchingPatterns'

export function PatternReader({inputPattern, setInputPattern, totalGames, setResultGames, setTotalGames}){
  const [progress, setProgress] = useState(false)

  useEffect(() => {
    console.log("progress changed: " + progress)
    if (progress){
      var results = searching.findPattern(inputPattern, totalGames, setResultGames)
      setResultGames(results)
      setProgress(false)
    }
  }, [progress])

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
          <Button onClick={() => setProgress(true)} color="success">Buscar patrón</Button>{"  "}
        </div>
        <div className="patternSpinner">
          {progress ? <Spinner /> : null}
        </div>
      </div>
  )
}
