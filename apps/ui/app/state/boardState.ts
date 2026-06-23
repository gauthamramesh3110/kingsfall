import { create } from "zustand";
import { Piece } from "protocol";

interface BoardState {
    yourPieces: Piece[];
    enemyPieces: Piece[];
}

interface BoardStateActions {
    updateBoardState: (yourPieces: Piece[], enemyPieces: Piece[]) => void;
}

export const useBoardState = create<BoardState & BoardStateActions>((set) => ({
    yourPieces: [],
    enemyPieces: [],
    updateBoardState: (yourPieces, enemyPieces) => {
        set({ yourPieces, enemyPieces });
    },
}));