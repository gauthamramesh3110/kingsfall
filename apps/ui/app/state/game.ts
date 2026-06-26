import { Room } from "protocol";
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