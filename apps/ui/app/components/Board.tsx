import { BOARD_SIZE, Position, Team } from "protocol"
import { useGameState, useMovesState } from "../state/game";
import { GLYPHS } from "../constants/constants";
import { useState } from "react";
import { playerId } from "../lib/socket";

const TEAM_COLORS: Record<Team, string> = {
    blue: "text-team-blue",
    red: "text-team-red",
};

const CORNER_POSITIONS: Record<number, Record<number, string>> = {
    0: {
        0: "rounded-tl-2xl",
        [BOARD_SIZE - 1]: "rounded-tr-2xl"
    },
    [BOARD_SIZE - 1]: {
        0: "rounded-bl-2xl",
        [BOARD_SIZE - 1]: "rounded-br-2xl"
    }
}

export default function Board() {
    const room = useGameState(state => state.room);
    const moves = useMovesState(state => state.moves);
    const addMove = useMovesState(state => state.addMove);

    const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);

    return (
        <div className="grid grid-cols-7 w-fit rounded-2xl overflow-clip">
            {
                Array.from({ length: BOARD_SIZE }, (_, i) => {
                    return Array.from({ length: BOARD_SIZE }, (_, j) => {
                        const piece = room?.board[i][j];
                        const move = moves[i][j];

                        const isValidMove = (
                            selectedSquare &&
                            room?.board[i][j] === null &&
                            room?.board[selectedSquare.row][selectedSquare.col]?.validMoves.some(position => position.row == i && position.col == j)
                        );

                        const bgClass = ((i + j) % 2 === 0) ? "bg-square-dark" : "bg-square-light";
                        const clickClass = piece && room.seats[piece.team] === playerId ? 'cursor-pointer' : 'cursor-default';
                        const pieceColorClass = piece ? TEAM_COLORS[piece.team] : ''
                        const cornerClass = CORNER_POSITIONS[i]?.[j] ? CORNER_POSITIONS[i][j] : '';
                        const selectedClass = (selectedSquare && selectedSquare.row == i && selectedSquare.col == j) ? 'border-2 border-gilt' : '';
                        const validMoveClass = isValidMove ? 'border-2 border-gilt-dim' : '';

                        return (
                            <div
                                key={`${i}-${j}`}
                                className={`aspect-square w-16 relative flex justify-center items-center ${bgClass} ${clickClass} ${cornerClass} ${selectedClass} ${validMoveClass}`}
                                onClick={piece && room.seats[piece.team] === playerId ? () => {
                                    setSelectedSquare({
                                        row: i,
                                        col: j
                                    });
                                } : isValidMove ? () => {
                                    console.log(`Selected ${i}, ${j}`);
                                    const selectedPiece = room.board[selectedSquare.row][selectedSquare.col]!;
                                    addMove(
                                        selectedPiece, { row: i, col: j }
                                    );
                                } : undefined}
                            >
                                {
                                    piece && <span className={`text-3xl ${pieceColorClass}`}>{GLYPHS[piece.type]}</span>
                                }
                                {
                                    move && <span className={`absolute bottom-1 right-1 text-xs ${pieceColorClass}`}>{GLYPHS[move.type]}</span>
                                }
                            </div>
                        )
                    })
                })
            }
        </div>
    )
}