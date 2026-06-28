import { BOARD_SIZE } from "protocol";
import type { Piece, PieceType, Position, Team } from "protocol";
import { randomUUID } from "crypto";
import { getValidMoves } from "./validMoves";

const pieceOrder: PieceType[] = ['K', 'Q', 'B', 'R', 'N'];

const firstRowOrder: (PieceType | null)[] = Array.from(
    { length: BOARD_SIZE },
    (_, j) => pieceOrder[j] ?? null
);
const lastRowOrder: (PieceType | null)[] = [...firstRowOrder].reverse();

export const initialPostition: (Piece | null)[][] = Array.from({ length: BOARD_SIZE }, (_, i) => {
    return Array.from({ length: BOARD_SIZE }, (_, j): Piece | null => {
        let type: PieceType | null = null;
        let team: Team | null = null;
        let position: Position = { row: i, col: j };

        if (i === 0) {
            type = firstRowOrder[j] ?? null;
            team = 'blue';
        } else if (i === BOARD_SIZE - 1) {
            type = lastRowOrder[j] ?? null;
            team = 'red';
        }

        if (type === null || team === null) return null;

        return {
            id: randomUUID(),
            type,
            team,
            position,
            validMoves: getValidMoves(type, position),
        };
    });
})