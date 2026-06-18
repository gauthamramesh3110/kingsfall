import { BOARD_SIZE, GLYPHS } from "../constants/constants";
import { useBoardState } from "../state/boardState";

const getSquareClasses = (row: number, col: number, isSelected: boolean, isLegalMove: boolean) => {
    const squareColorClass = (row + col) % 2 === 0 ? "bg-square-light" : "bg-square-dark";
    const selectedClass = isSelected ? "border-2 border-gilt" : "";
    const legalMoveClass = isLegalMove ? "border-2 border-gilt-dim" : "";
    const cornerClass = row === 0 && col === 0 ? "rounded-tl-lg" :
        row === 0 && col === BOARD_SIZE - 1 ? "rounded-tr-lg" :
            row === BOARD_SIZE - 1 && col === 0 ? "rounded-bl-lg" :
                row === BOARD_SIZE - 1 && col === BOARD_SIZE - 1 ? "rounded-br-lg" : "";

    return `${squareColorClass} ${selectedClass} ${legalMoveClass} ${cornerClass}`.trim();
};

export default function Board() {

    const boardState = useBoardState(state => state.boardState);
    const pieceSelected = useBoardState(state => state.pieceSelected);
    const legalMoves = useBoardState(state => state.legalMoves);

    return (
        <div className={`grid grid-cols-7 w-full max-w-lg mx-auto rounded-lg overflow-hidden`}>
            {[...Array(BOARD_SIZE * BOARD_SIZE)].map((_, i) => {
                const row = Math.floor(i / BOARD_SIZE);
                const col = i % BOARD_SIZE;
                const key = `${row}-${col}`;

                const piece = boardState.find(p => p.position.row === row && p.position.col === col);

                const isSelected = !!pieceSelected && pieceSelected.position.row === row && pieceSelected.position.col === col;
                const isLegalMove = legalMoves.some(move => move.row === row && move.col === col);

                const squareClasses = getSquareClasses(row, col, isSelected, isLegalMove);

                return (
                    <div
                        className={`text-3xl aspect-square flex items-center justify-center select-none ${squareClasses}`}
                        key={key}
                    >
                        {piece && (
                            <div
                                className="w-full h-full flex items-center justify-center cursor-pointer"
                                onClick={() => piece.team === "you" && useBoardState.getState().setPieceSelected(piece)}>
                                <span className={`select-none text-team-${piece.team}`}>{GLYPHS[piece.type]}</span>
                            </div>
                        )}
                        {!piece && isLegalMove && (
                            <div
                                className="w-full h-full flex items-center justify-center cursor-pointer"
                            >
                                <span className="select-none text-gilt-dim">•</span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}