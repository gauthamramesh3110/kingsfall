import { Piece, Position, Room } from "protocol";
import { create } from "zustand";

interface GameState {
    isGameActive: boolean;
    roomId: string | null;
    room: Room | null;
    tentativeMoves: Record<string, Position>;

    setTentativeMove: (pieceId: string, tentativePosition: Position) => void;
    clearTentativeMove: (pieceId: string) => void;
    resetTentativeMoves: () => void;
}

export const useGameState = create<GameState>((set) => ({
    isGameActive: false,
    roomId: null,
    room: null,
    tentativeMoves: {},

    setTentativeMove: (pieceId, tentativePosition) => {
        set(state => ({
            tentativeMoves: {
                ...state.tentativeMoves,
                [pieceId]: tentativePosition
            }
        }))
    },

    clearTentativeMove: (pieceId) => {
        set(state => {
            const tentativeMoves = { ...state.tentativeMoves };
            delete tentativeMoves[pieceId];
            return { tentativeMoves };
        })
    },

    resetTentativeMoves: () => {
        set({ tentativeMoves: {} });
    }
}));