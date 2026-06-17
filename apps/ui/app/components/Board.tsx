import { useState } from "react";
import { GLYPHS, Piece, PieceType } from "./gameTypes";
import { calculatePossibleMoves } from "./helpers";
import { BOARD_SIZE } from "./constants";
interface BoardProps {
    boardState: (Piece | null)[][];
    updateBoard: (newBoard: (Piece | null)[][]) => void;
}

const gridSizeClass = `grid-cols-${BOARD_SIZE}`;

export default function Board({ boardState, updateBoard }: BoardProps) {
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: number; type: PieceType } | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<{ row: number; col: number }[]>([]);

    const selectPiece = (row: number, col: number, type: PieceType) => {
        setSelectedCell({ row, col, type });
        const moves = calculatePossibleMoves(row, col, type);
        setPossibleMoves(moves);
    };    

    return (
        <div className={`grid ${gridSizeClass} w-full max-w-lg mx-auto rounded-lg overflow-hidden`}>
            {[...Array(BOARD_SIZE * BOARD_SIZE)].map((_, i) => {
                const row = Math.floor(i / BOARD_SIZE);
                const col = i % BOARD_SIZE;
                const key = `${row}-${col}`;

                const cellValue = boardState[row][col];
                const cellGlyph = cellValue ? GLYPHS[cellValue.type] : '';
                const cellTeam = cellValue ? cellValue.team : null;

                const isSelected = selectedCell?.row === row && selectedCell?.col === col;
                const isClickable = cellValue !== null && cellValue.team === 'you';
                const isPossibleMove = possibleMoves.some(move => move.row === row && move.col === col);

                const squareColorClass = (row + col) % 2 === 0 ? "bg-square-light" : "bg-square-dark";
                const teamColorClass = cellTeam === 'you' ? 'text-team-you' : cellTeam === 'enemy' ? 'text-team-enemy' : '';
                const selectedClass = isSelected ? 'border-4 border-gilt' : '';
                const possibleMoveClass = isPossibleMove ? 'border-4 border-gilt-dim' : '';
                const cornerClass = (
                    (row === 0 && col === 0) ? 'rounded-tl-lg' :
                        (row === 0 && col === BOARD_SIZE - 1) ? 'rounded-tr-lg' :
                            (row === BOARD_SIZE - 1 && col === 0) ? 'rounded-bl-lg' :
                                (row === BOARD_SIZE - 1 && col === BOARD_SIZE - 1) ? 'rounded-br-lg' :
                                    ''
                );


                return (
                    <div
                        className={`text-3xl aspect-square flex items-center justify-center select-none ${squareColorClass} ${teamColorClass} ${selectedClass} ${possibleMoveClass} ${cornerClass}`}
                        key={key}
                        onClick={() => isClickable && selectPiece(row, col, cellValue!.type)}
                    >
                        {cellGlyph}
                    </div>
                );
            })}
        </div>
    );
}