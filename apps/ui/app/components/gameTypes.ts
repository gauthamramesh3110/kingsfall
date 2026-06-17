export type PieceType = 'K' | 'Q' | 'R' | 'N' | 'B';
export type Team = 'you' | 'enemy';

export interface Piece {
  type: PieceType;
  team: Team;
}

export type Coord = { row: number; col: number };

export const GLYPHS: Record<PieceType, string> = {
  K: '♚',
  Q: '♛',
  R: '♜',
  N: '♞',
  B: '♝',
};
