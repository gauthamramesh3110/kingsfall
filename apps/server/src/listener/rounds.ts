import { io, rooms, type TypedSocket } from "..";
import type { Moves } from "protocol";
import { resolveBoard } from "../helpers/resolve";



export const startRounds = (roomId: string) => {
    const ROUND_INTERVAL = 10_000;
    const startNewRound = async () => {
        // socket.io types a broadcast ack as a single value; at runtime a room
        // broadcast resolves to one response per client.
        const moves = (await io
            .timeout(500)
            .to(roomId)
            .emitWithAck("retrieveMoves")) as [Moves, Moves];


        console.log(`Moves retrieved: ${JSON.stringify(moves)}`);
        resolveBoard(moves);

        console.log(`New Round for Room Id: ${roomId}`);
        io.to(roomId).emit("roundStarted", {
            roomId: roomId,
            room: rooms[roomId]!
        });
    }
    setInterval(startNewRound, ROUND_INTERVAL);
}

export const handleSubmitMoves = (socket: TypedSocket) => {
    socket.on("submitMoves", (moves: Moves) => {
        console.log("moves submitted");
    })
}