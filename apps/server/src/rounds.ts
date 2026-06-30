import { io, type TypedSocket } from ".";
import type { Moves } from "protocol";

const ROUND_INTERVAL = 10_000;

const startNewRound = async (roomId: string) => {
    // socket.io types a broadcast ack as a single value; at runtime a room
    // broadcast resolves to one response per client.
    const moves = (await io
        .timeout(500)
        .to(roomId)
        .emitWithAck("retrieveMoves")) as Moves[];
    
    console.log(`Moves retrieved: ${JSON.stringify(moves)}`);
    console.log(`New Round for Room Id: ${roomId}`);
    io.to(roomId).emit("roundStarted")
}

export const startRounds = (roomId: string) => {
    setInterval(startNewRound, ROUND_INTERVAL, roomId);
}

export const handleSubmitMoves = (socket: TypedSocket) => {
    socket.on("submitMoves", (moves: Moves) => {
        console.log("moves submitted");
    })
}