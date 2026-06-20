import { create } from 'zustand';

interface RoomState {
    roomId: string | null;
    setRoomId: (id: string | null) => void;
}

export const useRoomState = create<RoomState>((set) => ({
    roomId: null,
    setRoomId: (id) => set({ roomId: id })
}));