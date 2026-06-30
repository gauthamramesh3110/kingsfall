import { BOARD_SIZE, getTeamByPlayerId } from "protocol";
import type { Move, Piece, Room } from "protocol";

/**
 * Resolve a round into a new board.
 *
 * STUB: commit each submitted move's END SQUARE. No path-blocking, no captures,
 * no combat-by-strength yet (spec §4–5). On a collision two pieces end on the
 * same square and last-write-wins for now.
 *
 * TODO(combat): implement simultaneous end-square resolution + strength table
 * (Q5/R4/B3/N2/K1), equal-strength trades, king capture / win + draw.
 *
 * Returns a fresh board; never mutates the input.
 */
export function resolveMoves(
    board: (Piece | null)[][],
    submissions: Map<string, Move[]>,
    seats: Room["seats"]
): (Piece | null)[][] {
    // Index each piece's current position by id, and clone the board immutably.
    const next: (Piece | null)[][] = board.map((row) => row.slice());
    const positionById = new Map<string, { row: number; col: number; piece: Piece }>();
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const piece = board[row]?.[col];
            if (piece) positionById.set(piece.id, { row, col, piece });
        }
    }

    const room: Room = { seats, board };

    // Collect valid (piece, destination) pairs, then clear all sources before
    // placing any destination so one piece's move can't erase another's.
    const placements: { piece: Piece; from: { row: number; col: number }; to: Move["to"] }[] = [];
    for (const [playerId, moves] of submissions) {
        const team = getTeamByPlayerId(room, playerId);
        if (!team) continue;

        for (const move of moves) {
            const current = positionById.get(move.pieceId);
            // Ignore moves for unknown/already-removed pieces or pieces the
            // submitting player doesn't own (basic ownership guard).
            if (!current || current.piece.team !== team) continue;
            placements.push({ piece: current.piece, from: current, to: move.to });
        }
    }

    for (const { from } of placements) next[from.row]![from.col] = null;
    for (const { piece, to } of placements) next[to.row]![to.col] = piece; // last-write-wins on collision (stub)

    return next;
}
