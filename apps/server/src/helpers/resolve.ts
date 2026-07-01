import { BOARD_SIZE, type Moves, type Piece } from "protocol";
import { rooms } from "..";

export function resolveBoard(moves: [Moves, Moves]): void {
    const roomId = moves[0].roomId;
    const room = rooms[roomId];

    if (!room) return;

    const redPlayerId = room.seats.red;
    const bluePlayerId = room.seats.blue;

    const redMoves = moves.find(move => move.playerId === redPlayerId)!.tentativeMoves;
    const blueMoves = moves.find(move => move.playerId === bluePlayerId)!.tentativeMoves;

    const newBoardState: (Piece | null)[][] = Array.from({ length: BOARD_SIZE }, (_, i) => Array.from({ length: BOARD_SIZE }, (_, j) => {
        if (redMoves?.[i]?.[j] && redMoves[i][j].team === 'red') {
            return redMoves[i][j];
        }

        if (blueMoves?.[i]?.[j] && blueMoves[i][j].team === 'blue') {
            return blueMoves[i][j];
        }
        return null;
    }));

    room.board = newBoardState;
}