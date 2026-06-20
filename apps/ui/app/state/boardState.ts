import { create } from "zustand";
import { Piece } from "protocol";
import { getInitialBoardState, getLegalMovesForPiece } from "../helpers/helpers";

interface BoardState {
    boardState: Piece[];
    upcomingBoardState: Piece[];
    pieceSelected: Piece | null;
    legalMoves: { row: number; col: number }[];
}

interface BoardStateActions {
    setPieceSelected: (piece: Piece | null) => void;
    addTentativeMove: (piece: Piece, move: { row: number; col: number }) => void;
    reconcileTentativeMove: () => void;
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
    addTentativeMove: (piece, move) => {
        set((state) => ({
            upcomingBoardState: state.upcomingBoardState.map((p) => (p.type === piece.type && p.team === piece.team ? { ...p, position: move } : p))
        }));

        console.log(`Tentatively moving ${piece.type} to (${move.row}, ${move.col})`);
        console.log("Updated upcoming board state:", useBoardState.getState().upcomingBoardState);
    },
    reconcileTentativeMove: () => {
        set((state) => ({
            boardState: state.upcomingBoardState,
        }));
    }
}));