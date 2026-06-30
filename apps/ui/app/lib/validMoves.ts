import type { Piece, PieceType, Position } from "protocol";
import { BOARD_SIZE } from "protocol";

type Board = (Piece | null)[][];

const ORTHOGONAL_DIRECTIONS: Position[] = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
];

const DIAGONAL_DIRECTIONS: Position[] = [
    { row: -1, col: -1 },
    { row: -1, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 1 },
];

const KNIGHT_DELTAS: Position[] = [
    { row: -2, col: -1 },
    { row: -2, col: 1 },
    { row: -1, col: -2 },
    { row: -1, col: 2 },
    { row: 1, col: -2 },
    { row: 1, col: 2 },
    { row: 2, col: -1 },
    { row: 2, col: 1 },
];

const MOVEMENT: Record<PieceType, { directions: Position[]; sliding: boolean }> = {
    K: { directions: [...ORTHOGONAL_DIRECTIONS, ...DIAGONAL_DIRECTIONS], sliding: false },
    Q: { directions: [...ORTHOGONAL_DIRECTIONS, ...DIAGONAL_DIRECTIONS], sliding: true },
    R: { directions: ORTHOGONAL_DIRECTIONS, sliding: true },
    B: { directions: DIAGONAL_DIRECTIONS, sliding: true },
    N: { directions: KNIGHT_DELTAS, sliding: false },
};

function isInBounds(position: Position): boolean {
    return position.row >= 0 && position.row < BOARD_SIZE && position.col >= 0 && position.col < BOARD_SIZE;
}

export function getValidMovesForPiece(
    board: Board,
    tentativeMoves: Board,
    selectedPosition: Position,
): Position[] {
    // The piece's identity and movement pattern come from the committed board.
    const selectedPiece = board[selectedPosition.row][selectedPosition.col];
    if (!selectedPiece) {
        return [];
    }

    const { directions, sliding } = MOVEMENT[selectedPiece.type];
    const moves: Position[] = [];

    for (const direction of directions) {
        let position = {
            row: selectedPosition.row + direction.row,
            col: selectedPosition.col + direction.col,
        };

        while (isInBounds(position)) {
            // Blocking is determined by the tentative (projected) board.
            const blocker = tentativeMoves[position.row][position.col];

            if (!blocker) {
                moves.push(position);
            } else {
                if (blocker.team !== selectedPiece.team) {
                    moves.push(position); // capture
                }
                break; // blocked, can't move past it
            }

            if (!sliding) {
                break;
            }

            position = {
                row: position.row + direction.row,
                col: position.col + direction.col,
            };
        }
    }

    return moves;
}
