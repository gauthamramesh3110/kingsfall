import { BOARD_SIZE, Move, Piece, Room, Team } from "protocol";

// Re-exported from the shared protocol package so client and server share one copy.
export { getTeamByPlayerId } from "protocol";

/**
 * Diff a projected `tentativeMoves` board against the committed `room.board` to
 * produce the move list for `playerId`'s own team. A piece whose tentative
 * position differs from its committed position yields a `{ pieceId, to }` move;
 * unmoved pieces are skipped (= the spec's "skip = stay put").
 */
export function getTentativeMovesForPlayer(
    room: Room,
    tentativeMoves: (Piece | null)[][],
    team: Team
): Move[] {
    // Index each piece's committed position by id.
    const committedPos = new Map<string, { row: number; col: number }>();
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const piece = room.board[row][col];
            if (piece) committedPos.set(piece.id, { row, col });
        }
    }

    const moves: Move[] = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const piece = tentativeMoves[row][col];
            if (!piece || piece.team !== team) continue;

            const from = committedPos.get(piece.id);
            if (from && (from.row !== row || from.col !== col)) {
                moves.push({ pieceId: piece.id, to: { row, col } });
            }
        }
    }
    return moves;
}
