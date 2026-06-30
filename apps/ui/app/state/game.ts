import { BOARD_SIZE, Piece, Position, Room, RoundStartPayload } from "protocol";
import { create } from "zustand";

interface GameState {
    isGameActive: boolean;
    roomId: string | null;
    room: Room | null;
    tentativeMoves: (Piece | null)[][];
    round: RoundStartPayload | null;
    clockOffset: number;          // serverNow - clientNow, measured once per round
    submittedRoundId: number | null;

    startGame: () => void;
    setRoomFromServer: (roomId: string, room: Room) => void;
    setTentativeMove: (pieceId: string, tentativePosition: Position) => void;
    startRound: (payload: RoundStartPayload) => void;
    commitResolved: (board: (Piece | null)[][]) => void;
    markSubmitted: (roundId: number) => void;
}

export const useGameState = create<GameState>((set) => ({
    isGameActive: false,
    roomId: null,
    room: null,
    tentativeMoves: Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => null)),
    round: null,
    clockOffset: 0,
    submittedRoundId: null,

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

    startRound: (payload) => {
        set((state) => ({
            round: payload,
            // Measure clock skew once, when the deadline arrives, so the client can
            // render `endsAt - (Date.now() + clockOffset)` independent of its own clock.
            clockOffset: payload.serverNow - Date.now(),
            submittedRoundId: null,
            // Reset the projected board to the freshly committed board for the new round.
            tentativeMoves: state.room ? state.room.board : state.tentativeMoves,
        }));
    },

    commitResolved: (board) => {
        set((state) => ({
            room: state.room ? { ...state.room, board } : state.room,
            tentativeMoves: board,
        }));
    },

    markSubmitted: (roundId) => {
        set({ submittedRoundId: roundId });
    },
}));