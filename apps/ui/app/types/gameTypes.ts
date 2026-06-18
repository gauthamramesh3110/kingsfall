export type PieceType = 'K' | 'Q' | 'R' | 'N' | 'B';
export type Team = 'you' | 'enemy';

export interface Piece {
    type: PieceType;
    team: Team;
    position: { row: number; col: number };
}