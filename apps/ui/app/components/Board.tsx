import { BOARD_SIZE, Piece, Position, Team } from "protocol"
import { useGameState } from "../state/game";
import { GLYPHS } from "../constants/constants";
import { useState } from "react";
import { playerId } from "../lib/socket";
import { getProjectedBoard, getValidMovesForPiece } from "../lib/validMoves";
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
    const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);

    return (
        <div className="grid grid-cols-7 w-fit rounded-2xl overflow-clip">
            {
                Array.from({ length: BOARD_SIZE }, (_, i) => {
                    return Array.from({ length: BOARD_SIZE }, (_, j) => {
                        const piece = room?.board[i][j]
                        const team = room ? getTeamByPlayerId(room, playerId) : undefined;

                        const isSelected = selectedSquare?.row == i && selectedSquare.col == j;
                        const isSelectable = piece && team && piece.team == team;

                        const bgClass = ((i + j) % 2 === 0) ? "bg-square-dark" : "bg-square-light";
                        const cornerClass = CORNER_POSITIONS[i]?.[j] ? CORNER_POSITIONS[i][j] : '';
                        const selectedClass = isSelected ? 'border-2 border-gilt' : '';
                        const selectableClass = isSelectable ? 'cursor-pointer' : '';
                        const squareClass = `${bgClass} ${cornerClass} ${selectedClass} ${selectableClass}`;

                        return (
                            <div
                                key={`${i}-${j}`}
                                className={`aspect-square w-16 relative flex justify-center items-center ${squareClass}`}
                                onClick={
                                    isSelectable
                                        ? () => {
                                            setSelectedSquare({
                                                row: i,
                                                col: j
                                            })
                                        }
                                        : undefined
                                }
                            >
                                {
                                    piece && <span className={`text-3xl select-none ${TEAM_COLORS[piece.team]}`}>{GLYPHS[piece.type]}</span>
                                }
                            </div>
                        )
                    })
                })
            }
        </div>
    )
}