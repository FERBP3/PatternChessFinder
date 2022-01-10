import BoardSquare from "./BoardSquare"

export default function Board({ board }){
  function getCoordinates(i){
    const x = i % 8
    const y = 8-Math.floor(i/8)
    return [x,y]
  }

  function isBlack(i){
    const [x,y] = getCoordinates(i)
    return (x+y) % 2 === 1
  }

  return (
    <div className="board">
      {
        board.flat().map((piece, i) => (
          <div key={i} className="square">
            <BoardSquare
              position={i}
              piece={piece}
              black={isBlack(i)}>
            </BoardSquare>
          </div>
        ))
      }
    </div>
  )
}
