import Chess from "chess.js"
import {getSquaresOfPiece} from "./chessParser"

export function findPattern(inputPattern, totalGames, setResultGames){
    console.log("buscando patrón...")
    var pattern = inputPattern.split('\n')
    if (!validPattern(pattern))
      return []

    pattern = splitPattern(pattern)
    var fenPattern = readPattern(pattern.fixed)

    if (pattern.fixed.length == 0 && pattern.attacking.length == 0)
      return false

    var resultIndexGames = []
    for (var i=0; i<totalGames.length; i++){
      //console.log(i)
      const history = totalGames[i].history({ verbose: true})
      const chess = new Chess()

      // for each move get fen and find pattern
      for (var j=0; j<history.length; j++){
        chess.move(history[j])
        var fenPosition = chess.fen()

        var found = true
        if (pattern.fixed.length > 0)
          found = searchPatternFixedPieces(fenPattern, fenPosition)

        if (found && pattern.attacking.length > 0){
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

export function searchPatternAttackingPiece(attackingPatterns, fenPosition){
  //console.log(attackingPatterns)
  //console.log(fenPosition)
  if (attackingPatterns.length == 0)
    return false

  var found
  for (let pattern of attackingPatterns){
    // get the piece and its color
    var piece = pattern.charAt(0)
    var color = piece == piece.toUpperCase() ? 'w' : 'b'
    var targetSquare = pattern.substring(3)
    piece = piece.toLowerCase()

    // Loading the game from the current fen position
    var chess = new Chess()
    chess.load(fenPosition)

    // Change the turn of current position to the color of the current pattern piece
    // so we can get the legal moves of that piece otherwise the list of legal moves would be empty
    if (color != chess.turn()){
      fenPosition = fenPosition.split(' ')
      fenPosition[1] = fenPosition[1]=='w' ? 'b': 'w'
      if (piece != 'p')
        fenPosition[3] = '-'
      if (piece != 'k')
        fenPosition[2] = '-'

      fenPosition =  fenPosition.join(' ')
      if (!chess.validate_fen(fenPosition)){
        return false
      }

      chess = new Chess(fenPosition)
      //console.log("new fen: "+fenPosition)
      //console.log("new turn: "+chess.turn())
    }

    // For each pattern get the piece and find its position
    var squares = getSquaresOfPiece(piece, color, chess.board())
    //console.log(squares)

    // if the piece is not in the board then return false
    if (squares.length == 0)
      return false

    found = false
    for (let square of squares){
      var moves = chess.moves({verbose: true, square: square})
      //console.log(moves)
      for (let move of moves){
        if (move.to == targetSquare){
          found = true
          break
        }
      }
      if (found)
        break
    }

    if (!found)
      return false
  }

  return true
}

