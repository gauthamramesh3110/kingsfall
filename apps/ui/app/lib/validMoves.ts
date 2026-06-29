import type { Piece, Position } from "protocol";

const isInBounds = (row: number, col: number) => row >= 0 && row < 7 && col >= 0 && col < 7;

export const getValidMovesForPiece = (
    board: ((Piece | null)[][] | undefined),
    selectedSquare: Position | null
) => {
    if (!board || !selectedSquare) return [];

    const selectedPiece = board[selectedSquare.row]?.[selectedSquare.col];
    if (!selectedPiece) return [];

    const moves: Position[] = [];

    const addDirectionalMoves = (rowDelta: number, colDelta: number) => {
        let nextRow = selectedSquare.row + rowDelta;
        let nextCol = selectedSquare.col + colDelta;

        while (isInBounds(nextRow, nextCol)) {
            const targetPiece = board[nextRow][nextCol];

            if (targetPiece) {
                if (targetPiece.team !== selectedPiece.team) {
                    moves.push({ row: nextRow, col: nextCol });
                }
                break;
            }

            moves.push({ row: nextRow, col: nextCol });
            nextRow += rowDelta;
            nextCol += colDelta;
        }
    };

    switch (selectedPiece.type) {
        case "K": {
            const offsets = [-1, 0, 1];
            offsets.forEach(rowDelta => {
                offsets.forEach(colDelta => {
                    if (rowDelta === 0 && colDelta === 0) return;

                    const nextRow = selectedSquare.row + rowDelta;
                    const nextCol = selectedSquare.col + colDelta;

                    if (!isInBounds(nextRow, nextCol)) return;

                    const targetPiece = board[nextRow][nextCol];
                    if (!targetPiece || targetPiece.team !== selectedPiece.team) {
                        moves.push({ row: nextRow, col: nextCol });
                    }
                });
            });
            break;
        }
        case "N": {
            const offsets = [
                { row: -2, col: -1 },
                { row: -2, col: 1 },
                { row: -1, col: -2 },
                { row: -1, col: 2 },
                { row: 1, col: -2 },
                { row: 1, col: 2 },
                { row: 2, col: -1 },
                { row: 2, col: 1 },
            ];

            offsets.forEach(({ row, col }) => {
                const nextRow = selectedSquare.row + row;
                const nextCol = selectedSquare.col + col;

                if (!isInBounds(nextRow, nextCol)) return;

                const targetPiece = board[nextRow][nextCol];
                if (!targetPiece || targetPiece.team !== selectedPiece.team) {
                    moves.push({ row: nextRow, col: nextCol });
                }
            });
            break;
        }
        case "B":
            addDirectionalMoves(-1, -1);
            addDirectionalMoves(-1, 1);
            addDirectionalMoves(1, -1);
            addDirectionalMoves(1, 1);
            break;
        case "R":
            addDirectionalMoves(-1, 0);
            addDirectionalMoves(1, 0);
            addDirectionalMoves(0, -1);
            addDirectionalMoves(0, 1);
            break;
        case "Q":
            addDirectionalMoves(-1, -1);
            addDirectionalMoves(-1, 0);
            addDirectionalMoves(-1, 1);
            addDirectionalMoves(0, -1);
            addDirectionalMoves(0, 1);
            addDirectionalMoves(1, -1);
            addDirectionalMoves(1, 0);
            addDirectionalMoves(1, 1);
            break;
        default:
            break;
    }

    return moves;
};
