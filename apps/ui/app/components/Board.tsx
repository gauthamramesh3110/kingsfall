'use client';

import { useState } from 'react';

type PieceType = 'K' | 'Q' | 'R' | 'N' | 'B';
type Team = 'you' | 'enemy';

interface Piece {
  type: PieceType;
  team: Team;
  row: number;
  col: number;
}

const GLYPHS: Record<PieceType, string> = {
  K: '♚',
  Q: '♛',
  R: '♜',
  N: '♞',
  B: '♝',
};

// Back rank order: R N B K Q (cols 0–4, col 5 left empty)
const BACK_RANK: PieceType[] = ['R', 'N', 'B', 'K', 'Q'];

function startingPieces(): Piece[] {
  return [
    ...BACK_RANK.map((type, col) => ({ type, team: 'you' as Team, row: 5, col })),
    ...BACK_RANK.map((type, col) => ({ type, team: 'enemy' as Team, row: 0, col })),
  ];
}

export default function Board() {
  const [pieces, setPieces] = useState<Piece[]>(startingPieces);

  const pieceAt = (row: number, col: number) =>
    pieces.find(p => p.row === row && p.col === col);

  return (
    <div className="board-wrap">
      <div className="board">
        {Array.from({ length: 36 }, (_, i) => {
          const row = Math.floor(i / 6);
          const col = i % 6;
          const isLight = (row + col) % 2 === 0;
          const piece = pieceAt(row, col);
          return (
            <div key={i} className={`board-cell ${isLight ? 'bg-square-light' : 'bg-square-dark'}`}>
              {piece && (
                <span className={piece.team === 'you' ? 'text-team-you' : 'text-team-enemy'}>
                  {GLYPHS[piece.type]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
