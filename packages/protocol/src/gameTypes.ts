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

export const BOARD_SIZE = 7;