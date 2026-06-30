import { BOARD_SIZE, Piece, Position, Room } from "protocol";
import { create } from "zustand";

interface GameState {
    isGameActive: boolean;
    roomId: string | null;
    room: Room | null;
    tentativeMoves: (Piece | null)[][];

    startGame: () => void;
    setRoomFromServer: (roomId: string, room: Room) => void;
    setTentativeMove: (pieceId: string, tentativePosition: Position) => void;
    clearTentativeMove: (pieceId: string) => void;
    resetTentativeMoves: () => void;
}

export const useGameState = create<GameState>((set) => ({
    isGameActive: false,
    roomId: null,
    room: null,
    tentativeMoves: Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => null)),

    startGame: () => {
        set({
            isGameActive: true
        })
    },

    setRoomFromServer: (roomId, room) => {
        set({
            roomId,
            room,
            tentativeMoves: room.board
        })
    },

    setTentativeMove: (pieceId, tentativePosition) => {
        null
    },

    clearTentativeMove: (pieceId) => {
        null
    },

    resetTentativeMoves: () => {
        null
    }
}));