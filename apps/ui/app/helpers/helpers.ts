import { BOARD_SIZE } from "../constants/constants";
import { Piece, PieceType } from "../types/gameTypes";

export const getInitialBoardState = (): Piece[] => {
    return [
        { type: 'K', team: 'you', position: { row: 6, col: 0 } },
        { type: 'Q', team: 'you', position: { row: 6, col: 1 } },
        { type: 'R', team: 'you', position: { row: 6, col: 2 } },
        { type: 'N', team: 'you', position: { row: 6, col: 3 } },
        { type: 'B', team: 'you', position: { row: 6, col: 4 } },

        { type: 'K', team: 'enemy', position: { row: 0, col: BOARD_SIZE - 1 } },
        { type: 'Q', team: 'enemy', position: { row: 0, col: BOARD_SIZE - 2 } },
        { type: 'R', team: 'enemy', position: { row: 0, col: BOARD_SIZE - 3 } },
        { type: 'N', team: 'enemy', position: { row: 0, col: BOARD_SIZE - 4 } },
        { type: 'B', team: 'enemy', position: { row: 0, col: BOARD_SIZE - 5 } },
    ] as Piece[];
};

export const getLegalMovesForPiece = (piece: Piece) => {
    const { position: { row, col }, type } = piece;
    // Placeholder logic for possible moves - to be replaced with actual game rules
    const moves = [];
    if (type === 'K') {
        moves.push({ row: row - 1, col });
        moves.push({ row: row + 1, col });
        moves.push({ row, col: col - 1 });
        moves.push({ row, col: col + 1 });
    } else if (type === 'Q') {
        for (let i = 1; i < BOARD_SIZE; i++) {
            moves.push({ row: row - i, col });
            moves.push({ row: row + i, col });
            moves.push({ row, col: col - i });
            moves.push({ row, col: col + i });
        }
    } else if (type === 'R') {
        for (let i = 1; i < BOARD_SIZE; i++) {
            moves.push({ row: row - i, col });
            moves.push({ row: row + i, col });
            moves.push({ row, col: col - i });
            moves.push({ row, col: col + i });
        }
    } else if (type === 'N') {
        moves.push({ row: row - 2, col: col - 1 });
        moves.push({ row: row - 2, col: col + 1 });
        moves.push({ row: row + 2, col: col - 1 });
        moves.push({ row: row + 2, col: col + 1 });
        moves.push({ row: row - 1, col: col - 2 });
        moves.push({ row: row - 1, col: col + 2 });
        moves.push({ row: row + 1, col: col - 2 });
        moves.push({ row: row + 1, col: col + 2 });
    } else if (type === 'B') {
        for (let i = 1; i < BOARD_SIZE; i++) {
            moves.push({ row: row - i, col: col - i });
            moves.push({ row: row - i, col: col + i });
            moves.push({ row: row + i, col: col - i });
            moves.push({ row: row + i, col: col + i });
        }
    }
    return moves;
};