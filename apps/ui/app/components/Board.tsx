import { BOARD_SIZE, GLYPHS } from "../constants/constants";
import { useBoardState } from "../state/boardState";

const getSquareClasses = (row: number, col: number) => {
    const squareColorClass = (row + col) % 2 === 0 ? "bg-square-light" : "bg-square-dark";

    const cornerClass = row === 0 && col === 0 ? "rounded-tl-lg" :
        row === 0 && col === BOARD_SIZE - 1 ? "rounded-tr-lg" :
            row === BOARD_SIZE - 1 && col === 0 ? "rounded-bl-lg" :
                row === BOARD_SIZE - 1 && col === BOARD_SIZE - 1 ? "rounded-br-lg" : "";

    return `${squareColorClass} ${cornerClass} `.trim();
};

export default function Board() {

    const yourPieces = useBoardState(state => state.yourPieces);
    const enemyPieces = useBoardState(state => state.enemyPieces);

    return (
        <div className={`grid grid-cols-7 w-full max-w-lg mx-auto rounded-lg overflow-hidden`}>
            {[...Array(BOARD_SIZE * BOARD_SIZE)].map((_, i) => {
                const row = Math.floor(i / BOARD_SIZE);
                const col = i % BOARD_SIZE;
                const key = `${row}-${col}`;

                const squareClasses = getSquareClasses(row, col);

                const yourPiece = yourPieces.find(piece => piece.position.row == row && piece.position.col == col)
                const enemyPiece = enemyPieces.find(piece => piece.position.row == row && piece.position.col == col)

                return (
                    <div
                        className={`text-3xl aspect-square flex items-center justify-center select-none ${squareClasses}`}
                        key={key}
                    >
                        {
                            yourPiece && (
                                <span className="text-team-you">{GLYPHS[yourPiece.type]}</span>
                            )
                        }
                        {
                            enemyPiece && (
                                <span className="text-team-enemy">{GLYPHS[enemyPiece.type]}</span>
                            )
                        }
                    </div>
                );
            })}
        </div>
    );
}