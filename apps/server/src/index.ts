import { Server, type Socket } from "socket.io";
import type {
    Room,
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData,
} from "protocol";
import { handleChallenge, handleChallengeAccept } from "./listener/challenge.js";

export type TypedSocket = Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>;

export const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(8080, { cors: { origin: "*" } });
export const rooms: Record<string, Room> = {};
export const playerSocketIds = new Map<string, string>();

io.use((socket, next) => {
    const playerId = socket.handshake.auth.playerId;
    if (!playerId) return next(new Error('missing playerId'));
    socket.data.playerId = playerId;
    next();
})

io.on("connection", (socket: TypedSocket) => {
    const playerId = socket.data.playerId;
    playerSocketIds.set(playerId, socket.id);
    console.log(`user connected with the id: ${socket.id} and player_id: ${playerId}`);

    handleChallenge(socket);
    handleChallengeAccept(socket);

    socket.on("disconnect", () => {
        playerSocketIds.delete(playerId);
        console.log("user disconnected");
    });
});
