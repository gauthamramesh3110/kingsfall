import { create } from "zustand";
import { Piece } from "../types/gameTypes";
import { getInitialBoardState, getLegalMovesForPiece } from "../helpers/helpers";

interface BoardState {
    boardState: Piece[];
    upcomingBoardState: Piece[];
    pieceSelected: Piece | null;
    legalMoves: { row: number; col: number }[];
}

interface BoardStateActions {
    setPieceSelected: (piece: Piece | null) => void;
}

export const useBoardState = create<BoardState & BoardStateActions>((set) => ({
    boardState: getInitialBoardState(),
    upcomingBoardState: getInitialBoardState(),
    pieceSelected: null,
    legalMoves: [],
    setPieceSelected: (piece) => {
        set({ pieceSelected: piece })
        const legalMoves = piece ? getLegalMovesForPiece(piece) : [];
        console.log("Legal moves for selected piece:", legalMoves);
        set({ legalMoves });
    },
}));