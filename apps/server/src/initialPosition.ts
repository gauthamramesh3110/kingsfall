import { BOARD_SIZE } from "protocol";
import type { Piece, PieceType, Position, Team } from "protocol";
import { randomUUID } from "crypto";
import { getValidMoves } from "./validMoves";

const pieceOrder: PieceType[] = ['K', 'Q', 'B', 'R', 'N'];
const pieces: Piece[] = [];

pieceOrder.forEach((pieceType, idx) => {
    const redPiece: Piece = {
        id: randomUUID(),
        type: pieceType,
        team: 'red',
        position: {
            row: 0,
            col: idx,
        }
    }

    const bluePiece: Piece = {
        id: randomUUID(),
        type: pieceType,
        team: 'blue',
        position: {
            row: BOARD_SIZE - 1,
            col: BOARD_SIZE - idx - 1
        }
    }

    pieces.push(redPiece, bluePiece);
});

export const initialPostition = pieces;