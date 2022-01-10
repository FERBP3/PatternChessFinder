export default function Square({children, black}){
    const color = black ? "black-tile" : "white-tile"
    return (
        <div className={`${color} board-square`}>{children}</div>
    )
}
