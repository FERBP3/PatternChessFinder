const chessColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export function getSquaresOfPiece(piece, color, board){
  var squares = []
  for (let row=0; row<8; row++){
    for (let col=0; col<8; col++){
      if (board[row][col] != null)
        if (board[row][col].type == piece && board[row][col].color == color){
          var parsedRow = Math.abs(row-8)
          squares.push(chessColumns[col]+parsedRow)
        }
    }
  }
  return squares
}
