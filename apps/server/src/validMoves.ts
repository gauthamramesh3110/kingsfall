import { BOARD_SIZE, type Piece, type PieceType, type Position } from "protocol";

export const getValidMoves = (pieceType: PieceType, currentPosition: Position) => {
    let moves: Position[] = [];

    switch (pieceType) {
        case "K":
            moves = calculateValidKingMoves(pieceType, currentPosition);
            break;
        case "Q":
            break;
        case "R":
            break;
        case "N":
            break;
        case "B":
            break;
        default:
            console.log('Unknown Piece Type');
    }

    moves = moves.filter(move => move.col >= 0 && move.col < BOARD_SIZE && move.row >= 0 && move.row < BOARD_SIZE);
    return moves;
}

const calculateValidKingMoves = (pieceType: PieceType, currentPosition: Position) => {
    let moves: Position[] = [];

    if (pieceType !== 'K') return moves;

    const row = currentPosition.row;
    const col = currentPosition.col;

    moves.push({
        row: row - 1,
        col: col
    });

    moves.push({
        row: row,
        col: col - 1
    });

    moves.push({
        row: row + 1,
        col: col
    });

    moves.push({
        row: row,
        col: col + 1
    });

    return moves;
}