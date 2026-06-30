import { BOARD_SIZE } from "protocol";
import type { Piece, PieceType, Position, Team } from "protocol";
import { randomUUID } from "crypto";

const pieceOrder: PieceType[] = ['K', 'Q', 'B', 'R', 'N'];

const redRow: (Piece | null)[] = Array.from({ length: BOARD_SIZE }, (_, i) => {
    return i < pieceOrder.length ? {
        id: randomUUID(),
        team: 'red' as Team,
        type: pieceOrder[i]!
    } : null;
});

const blueRow: (Piece | null)[] = Array.from({ length: BOARD_SIZE }, (_, i) => {
    return i < pieceOrder.length ? {
        id: randomUUID(),
        team: 'blue' as Team,
        type: pieceOrder[i]!
    } : null;
}).reverse();

export const initialPosition: (Piece | null)[][] = Array.from({ length: BOARD_SIZE }, (_, i) => {
    if (i === 0) return redRow;
    if (i === BOARD_SIZE - 1) return blueRow;
    return Array.from({ length: BOARD_SIZE }, (_, j) => null)
})