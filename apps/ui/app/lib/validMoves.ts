import type { Piece, Position } from "protocol";

function hasMoveAt(moves: Position[], position: Position): boolean {
    return moves.some((move) => move.row === position.row && move.col === position.col);
}

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

function isInBounds(position: Position): boolean {
    return position.row >= 0 && position.row < 7 && position.col >= 0 && position.col < 7;
}

function getPieceAt(pieces: Piece[], position: Position): Piece | undefined {
    return pieces.find((piece) => piece.position.row === position.row && piece.position.col === position.col);
}

function addMoveIfValid(
    moves: Position[],
    pieces: Piece[],
    selectedPiece: Piece,
    position: Position,
): boolean {
    if (!isInBounds(position)) {
        return false;
    }

    if (hasMoveAt(moves, position)) {
        return false;
    }

    const occupant = getPieceAt(pieces, position);
    if (!occupant) {
        moves.push(position);
        return true;
    }

    if (occupant.team !== selectedPiece.team) {
        moves.push(position);
    }

    return false;
}

export function getProjectedBoard(pieces: Piece[], tentativeMoves: Record<string, Position>): Piece[] {
    const bySquare = new Map<string, Piece>();

    for (const piece of pieces) {
        const target = tentativeMoves[piece.id];
        const position = target ?? piece.position;
        const key = `${position.row},${position.col}`;
        const existing = bySquare.get(key);

        if (!existing) {
            bySquare.set(key, { ...piece, position });
            continue;
        }

        // Collision: the piece that moved here captures the stationary one.
        if (target !== undefined && tentativeMoves[existing.id] === undefined) {
            bySquare.set(key, { ...piece, position });
        }
    }

    return [...bySquare.values()];
}

export function getValidMovesForPiece(pieces: Piece[], selectedPosition: Position): Position[] {
    const selectedPiece = getPieceAt(pieces, selectedPosition);
    if (!selectedPiece) {
        return [];
    }

    const moves: Position[] = [];
    const { row, col } = selectedPosition;

    switch (selectedPiece.type) {
        case "K": {
            for (const direction of [...ORTHOGONAL_DIRECTIONS, ...DIAGONAL_DIRECTIONS]) {
                const nextPosition = { row: row + direction.row, col: col + direction.col };
                addMoveIfValid(moves, pieces, selectedPiece, nextPosition);
            }
            break;
        }
        case "Q": {
            for (const direction of [...ORTHOGONAL_DIRECTIONS, ...DIAGONAL_DIRECTIONS]) {
                let nextPosition = { row: row + direction.row, col: col + direction.col };
                while (addMoveIfValid(moves, pieces, selectedPiece, nextPosition)) {
                    nextPosition = { row: nextPosition.row + direction.row, col: nextPosition.col + direction.col };
                }
            }
            break;
        }
        case "R": {
            for (const direction of ORTHOGONAL_DIRECTIONS) {
                let nextPosition = { row: row + direction.row, col: col + direction.col };
                while (addMoveIfValid(moves, pieces, selectedPiece, nextPosition)) {
                    nextPosition = { row: nextPosition.row + direction.row, col: nextPosition.col + direction.col };
                }
            }
            break;
        }
        case "B": {
            for (const direction of DIAGONAL_DIRECTIONS) {
                let nextPosition = { row: row + direction.row, col: col + direction.col };
                while (addMoveIfValid(moves, pieces, selectedPiece, nextPosition)) {
                    nextPosition = { row: nextPosition.row + direction.row, col: nextPosition.col + direction.col };
                }
            }
            break;
        }
        case "N": {
            for (const delta of KNIGHT_DELTAS) {
                const nextPosition = { row: row + delta.row, col: col + delta.col };
                addMoveIfValid(moves, pieces, selectedPiece, nextPosition);
            }
            break;
        }
    }

    return moves;
}

