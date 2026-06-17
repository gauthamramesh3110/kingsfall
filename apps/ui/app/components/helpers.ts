import { BOARD_SIZE } from "./constants";
import { PieceType } from "./gameTypes";

export const calculatePossibleMoves = (row: number, col: number, type: PieceType) => {
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