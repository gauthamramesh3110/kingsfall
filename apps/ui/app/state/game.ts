import { BOARD_SIZE, Piece, Position, Room } from "protocol";
import { create } from "zustand";

interface GameState {
    isGameActive: boolean;
    roomId: string | null;
    room: Room | null;
}

export const useGameState = create<GameState>((set) => ({
    isGameActive: false,
    roomId: null,
    room: null
}));

interface MovesState {
    moves: (Piece | null)[][]
    addMove: (piece: Piece, newPosition: Position) => void;

}
export const useMovesState = create<MovesState>(set => ({
    moves: Array.from({ length: BOARD_SIZE }, (_, i) => Array.from({ length: BOARD_SIZE }, (_, j) => null)),
    addMove: (piece, newPosition) => {
        set(state => {
            const newMoves = [...state.moves];
            newMoves[newPosition.row][newPosition.col] = piece;

            return {
                moves: newMoves
            }
        })
    }
}))