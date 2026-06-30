import { Server, type Socket } from "socket.io";
import type { Room } from "protocol";
import { handleChallenge, handleChallengeAccept } from "./challenge.js";
import { handleSubmitMoves } from "./round.js";

export const io = new Server(8080, { cors: { origin: "*" } });
export const rooms: Record<string, Room> = {};
export const playerSocketIds = new Map<string, string>();

io.use((socket, next) => {
    const playerId = socket.handshake.auth.playerId;
    if (!playerId) return next(new Error('missing playerId'));
    socket.data.playerId = playerId;
    next();
})

io.on("connection", (socket: Socket) => {
    const playerId = socket.data.playerId;
    playerSocketIds.set(playerId, socket.id);
    console.log(`user connected with the id: ${socket.id} and player_id: ${playerId}`);

    handleChallenge(socket);
    handleChallengeAccept(socket);
    handleSubmitMoves(socket);

    socket.on("disconnect", () => {
        playerSocketIds.delete(playerId);
        // TODO(room-lifecycle): tear down the round loop (stopRound) for any room
        // this player was in once room ownership/reconnect handling exists.
        console.log("user disconnected");
    });
});
