import Square from './Square'
import Piece from './Piece'

export default function BoardSquare({position, piece, black}){
    return (
        <div className="board-square">
            <Square black={black}>
                {piece && <Piece position={position} piece={piece}/>}
            </Square>
        </div>
    )
}
