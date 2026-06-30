import type { Moves, Room } from "./gameTypes";

// client emits  ->  server listens (socket.on)
export interface ClientToServerEvents {
    challenge: (opponentId: string) => void;
    acceptChallenge: (challengerId: string) => void;
    submitMoves: (moves: Moves) => void;
}

// server emits  ->  client listens (socket.on)
export interface ServerToClientEvents {
    challenge: (opponentId: string) => void;
    matchStarted: (matchDetails: { roomId: string; room: Room }) => void;
    roundStarted: () => void;
    // last param is the ack callback; its arg is what each client returns
    retrieveMoves: (callback: (moves: Moves) => void) => void;
}

export interface InterServerEvents {}

export interface SocketData {
    playerId: string;
}
