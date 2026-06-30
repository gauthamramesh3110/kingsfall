export type PieceType = 'K' | 'Q' | 'R' | 'N' | 'B';
export type Position = { row: number; col: number };
export type Team = 'red' | 'blue';

export interface Piece {
    id: string;
    type: PieceType;
    team: Team;
}

export interface Room {
    seats: Record<Team, string | null>;
    board: (Piece | null)[][];
}

export type Move = { pieceId: string; to: Position };

// server -> clients, at the start of every round
export interface RoundStartPayload {
    roundId: number;
    serverNow: number;   // Date.now() on the server when emitting
    endsAt: number;      // serverNow + durationMs (absolute deadline, ms)
    durationMs: number;
}

// client -> server, sent at the buzzer
export interface SubmitMovesPayload {
    roomId: string;
    roundId: number;     // guards against stale submissions
    moves: Move[];
}

// server -> clients, after resolution (next RoundStartPayload follows immediately)
export interface RoundResolvedPayload {
    roundId: number;
    board: (Piece | null)[][];
}

export const BOARD_SIZE = 7;
export const ROUND_DURATION_MS = 10_000; // spec §3