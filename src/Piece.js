export default function Piece({position, piece}){
    const imagePiece = `pieces/${piece.type}_${piece.color}.png`
    return (
        <>
            <div className="piece-container">
                <img src={imagePiece} alt="" className="piece" />
            </div>
        </>
    )
}
