import { create } from 'zustand';

interface RoomState {
    playerId: string | null;
    roomId: string | null;
    setRoomId: (id: string | null) => void;
    setPlayerId: (id: string | null) => void;
}

export const useRoomState = create<RoomState>((set) => ({
    playerId: null,
    roomId: null,
    setRoomId: (id) => set({ roomId: id }),
    setPlayerId: (id) => set({ playerId: id }),
}));