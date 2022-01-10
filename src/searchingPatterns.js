import Chess from "chess.js"

export function findPattern(inputPattern, totalGames, setResultGames){
    console.log("buscando patrón...")
    var pattern = inputPattern.split('\n')
    if (!validPattern(pattern))
      return []

    pattern = splitPattern(pattern)
    var fenPattern = readPattern(pattern.fixed)

    var resultIndexGames = []
    for (var i=0; i<totalGames.length; i++){
      const history = totalGames[i].history({ verbose: true})
      const chess = new Chess()

      // for each move get fen and find pattern
      for (var j=0; j<history.length; j++){
        chess.move(history[j])
        var fenPosition = chess.fen()
        var found = searchPatternFixedPieces(fenPattern, fenPosition)

        if (found){
          found = searchPatternAttackingPiece(pattern.attacking, fenPosition)
          if (found){
            resultIndexGames.push(i)
            break
          }
        }
      }
    }
    console.log("busqueda finalizada")
    console.log(resultIndexGames.length)
    return resultIndexGames
}

export function searchPatternOne(inputPattern, fenPosition){
  var pattern = inputPattern.split('\n')
  if (!validPattern(pattern))
    return false

  pattern = splitPattern(pattern)
  var fenPattern = readPattern(pattern.fixed)

  var found = searchPatternFixedPieces(fenPattern, fenPosition)
  if (found)
    found = searchPatternAttackingPiece(pattern.attacking, fenPosition)
  return found
}

export function validPattern(patterns){
  if (patterns == "" || patterns.length == 0)
    return false
  return true
}

export function splitPattern(pattern){
  var splitedPattern = {fixed: [], attacking: []}
  for (let p of pattern){
    if (p.charAt(1) != '-')
      splitedPattern.fixed.push(p)
    else
      splitedPattern.attacking.push(p)
  }
  return splitedPattern
}

export function readPattern(pattern){
  const chess = new Chess()
  chess.clear()

  for (let p of pattern){
    var piece = p.charAt(0)
    const position = p.substring(1)

    // get color
    var color = ''
    if (piece === piece.toUpperCase())
      color = 'w'
    else
      color = 'b'
    piece = piece.toLowerCase()
    chess.put({type: piece, color: color}, position)
  }

  var fenPattern = chess.fen()
  fenPattern = fenPattern.substring(0, fenPattern.indexOf(' '))
  return fenPattern
}


export function searchPatternFixedPieces(pattern, fenPosition){
  var indexFenPosition = 0
  for (let c of pattern){
    // If there is a letter in pattern is piece, so we need to compare it with the fenPosition
    if (isNaN(c)){
      if (fenPosition.charAt(indexFenPosition) == c)
        indexFenPosition++
      else
        return false
    }else{
      // If it is a number in the pattern we need to check if there are c tiles (empty or not)
      // and we need to update the indexFenPosition which it's pointing to the next piece or tile
      var wildcard = parseInt(c)
      for (let j=0; j<wildcard; j++){
        if (isNaN(fenPosition.charAt(indexFenPosition))){
            indexFenPosition++
        }else{
            j += parseInt(fenPosition.charAt(indexFenPosition))-1
            indexFenPosition++
        }
      }
    }
  }

  return true
}

export function searchPatternAttackingPiece(attackingPattern, fenPosition){
  if (attackingPattern.length == 0)
    return true

  // From the current fenPosition duplicate it changing the turn in the game w->b or b->w
  var fenPositions = [fenPosition]
  var fenPosition2 = fenPosition.split(' ')
  if (fenPosition2[1] == 'w')
    fenPosition2[1] = 'b'
  else
    fenPosition2[1] = 'w'
  fenPositions.push(fenPosition2.join(' '))

  // For each fenPosition generate moves() and make the set of total moves
  // then search for the piece requested and the attaked tile in the total set
  var chess = new Chess()
  var total_moves = []
  for (let position of fenPositions){
    chess.clear()
    chess.load(position)
    var moves = chess.moves({verbose: true})
    total_moves.push.apply(total_moves, moves)
  }

  // Search for each pattern in total moves
  for (let pattern of attackingPattern){
    var piece = pattern.charAt(0)
    var color = ""
    if (piece == piece.toUpperCase())
      color = 'w'
    else
      color = 'b'
    piece = piece.toLowerCase()
    var targetSquare = pattern.substring(3)

    var foundPattern = false
    for (let move of total_moves){
      if (move.piece == piece && move.color == color && move.to == targetSquare){
        foundPattern = true
        break
      }
    }
  }
  return foundPattern
}

