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
        set((state) => {
            let movedPiece: Piece | null = null;

            // Clear any existing tentative cell for this piece.
            const next = state.tentativeMoves.map((row) =>
                row.map((cell) => {
                    if (cell?.id === pieceId) {
                        movedPiece = cell;
                        return null;
                    }
                    return cell;
                })
            );

            if (movedPiece) {
                next[tentativePosition.row][tentativePosition.col] = movedPiece;
            }

            return { tentativeMoves: next };
        });
    },
}));