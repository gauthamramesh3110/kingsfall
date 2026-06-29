import { BOARD_SIZE, type PieceType, type Position } from "protocol";

export const getValidMoves = (pieceType: PieceType, currentPosition: Position) => {
    let moves: Position[] = [];

    switch (pieceType) {
        case "K":
            moves = calculateValidKingMoves(currentPosition);
            break;
        case "Q":
            moves = calculateValidQueenMoves(currentPosition);
            break;
        case "R":
            moves = calculateValidRookMoves(currentPosition);
            break;
        case "N":
            moves = calculateValidKnightMoves(currentPosition);
            break;
        case "B":
            moves = calculateValidBishopMoves(currentPosition);
            break;
        default:
            console.log('Unknown Piece Type');
    }

    moves = moves.filter(move => move.col >= 0 && move.col < BOARD_SIZE && move.row >= 0 && move.row < BOARD_SIZE);
    return moves;
}

const calculateValidKingMoves = (currentPosition: Position) => {
    const row = currentPosition.row;
    const col = currentPosition.col;

    return [
        { row: row - 1, col },
        { row, col: col - 1 },
        { row: row + 1, col },
        { row, col: col + 1 },
    ];
}

const calculateValidBishopMoves = (currentPosition: Position) => {
    return calculateSlidingMoves(currentPosition, [
        { row: -1, col: -1 },
        { row: -1, col: 1 },
        { row: 1, col: -1 },
        { row: 1, col: 1 },
    ]);
}

const calculateValidRookMoves = (currentPosition: Position) => {
    return calculateSlidingMoves(currentPosition, [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
    ]);
}

const calculateValidQueenMoves = (currentPosition: Position) => {
    return calculateSlidingMoves(currentPosition, [
        { row: -1, col: -1 },
        { row: -1, col: 0 },
        { row: -1, col: 1 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
        { row: 1, col: -1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
    ]);
}

const calculateValidKnightMoves = (currentPosition: Position) => {
    const row = currentPosition.row;
    const col = currentPosition.col;

    return [
        { row: row - 2, col: col - 1 },
        { row: row - 2, col: col + 1 },
        { row: row - 1, col: col - 2 },
        { row: row - 1, col: col + 2 },
        { row: row + 1, col: col - 2 },
        { row: row + 1, col: col + 2 },
        { row: row + 2, col: col - 1 },
        { row: row + 2, col: col + 1 },
    ];
}

const calculateSlidingMoves = (currentPosition: Position, directions: Array<{ row: number; col: number }>) => {
    const moves: Position[] = [];
    const row = currentPosition.row;
    const col = currentPosition.col;

    directions.forEach(direction => {
        let nextRow = row + direction.row;
        let nextCol = col + direction.col;

        while (nextRow >= 0 && nextRow < BOARD_SIZE && nextCol >= 0 && nextCol < BOARD_SIZE) {
            moves.push({ row: nextRow, col: nextCol });
            nextRow += direction.row;
            nextCol += direction.col;
        }
    });

    return moves;
}

