export type PieceType = 'K' | 'Q' | 'R' | 'N' | 'B';
export type Position = { row: number; col: number };

export interface Piece {
    type: PieceType;
    position: Position;
}
