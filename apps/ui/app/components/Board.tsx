import { BOARD_SIZE, Piece, Position, Team } from "protocol"
import { useGameState } from "../state/game";
import { GLYPHS } from "../constants/constants";
import { useMemo, useState } from "react";
import { playerId } from "../lib/socket";
import { getValidMovesForPiece } from "../lib/validMoves";
import { getTeamByPlayerId } from "../helpers/helpers";

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
    const tentativeMoves = useGameState(state => state.tentativeMoves);
    const setTentativeMove = useGameState(state => state.setTentativeMove);
    const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);

    const validMoves = useMemo(
        () =>
            room && selectedSquare
                ? getValidMovesForPiece(room.board, tentativeMoves, selectedSquare)
                : [],
        [room, selectedSquare, tentativeMoves]
    );

    return (
        <div className="grid grid-cols-7 w-fit rounded-2xl overflow-clip">
            {
                Array.from({ length: BOARD_SIZE }, (_, i) => {
                    return Array.from({ length: BOARD_SIZE }, (_, j) => {
                        const piece = room?.board[i][j]
                        const team = room ? getTeamByPlayerId(room, playerId) : undefined;
                        const tentativeMove = tentativeMoves[i][j];

                        const isSelected = selectedSquare?.row == i && selectedSquare.col == j;
                        const isSelectable = piece && team && piece.team == team;
                        const isValidMove = validMoves.some(move => move.row === i && move.col === j);

                        const bgClass = ((i + j) % 2 === 0) ? "bg-square-dark" : "bg-square-light";
                        const cornerClass = CORNER_POSITIONS[i]?.[j] ? CORNER_POSITIONS[i][j] : '';
                        const selectedClass = isSelected ? 'border-2 border-gilt' : '';
                        const selectableClass = isSelectable ? 'cursor-pointer' : '';
                        const validMoveClass = isValidMove ? 'cursor-pointer ring-2 ring-inset ring-gilt-dim' : '';
                        const squareClass = `${bgClass} ${cornerClass} ${selectedClass} ${selectableClass} ${validMoveClass}`;

                        return (
                            <div
                                key={`${i}-${j}`}
                                className={`aspect-square w-16 relative flex justify-center items-center ${squareClass}`}
                                onClick={() => {
                                    if (isValidMove && selectedSquare) {
                                        console.log('Setting Move')
                                        const selectedPiece = room?.board[selectedSquare.row][selectedSquare.col]
                                        setTentativeMove(selectedPiece!.id, { row: i, col: j });
                                        setSelectedSquare(null);
                                    } else if (isSelectable) {
                                        setSelectedSquare({
                                            row: i,
                                            col: j
                                        })
                                    }
                                }}
                            >
                                {
                                    piece && <span className={`text-3xl select-none ${TEAM_COLORS[piece.team]}`}>{GLYPHS[piece.type]}</span>
                                }
                                {
                                    tentativeMove && <span className={`absolute bottom-0 right-1 text-l opacity-15 select-none ${TEAM_COLORS[tentativeMove.team]}`}>{GLYPHS[tentativeMove.type]}</span>
                                }
                            </div>
                        )
                    })
                })
            }
        </div >
    )
}