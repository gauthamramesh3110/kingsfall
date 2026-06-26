import { BOARD_SIZE } from "protocol"
import { useGameState } from "../state/game";
import { GLYPHS } from "../constants/constants";

export default function Board() {
    const room = useGameState(state => state.room);

    return (
        <div className="grid grid-cols-7 w-fit">
            {
                Array.from({ length: BOARD_SIZE }, (_, i) => {
                    return Array.from({ length: BOARD_SIZE }, (_, j) => {
                        const isEvenSquare = (i + j) % 2 === 0;
                        const bgClass = isEvenSquare ? "bg-square-dark" : "bg-square-light";
                        const piece = room?.board[i][j];

                        return (
                            <div key={`${i}-${j}`} className={`aspect-square w-16 ${bgClass} flex justify-center items-center`}>
                                {
                                    piece && <span className={`text-team-${piece.team} text-3xl`}>{GLYPHS[piece.type]}</span>
                                }
                            </div>
                        )
                    })
                })
            }
        </div>
    )
}