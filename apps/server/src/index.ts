import { Server, type Socket } from "socket.io";
import type { Piece, Room } from "protocol";

interface JoinRoomResponse {
    success: boolean;
    roomId: string;
}

const io = new Server(8080, { cors: { origin: "*" } });
const rooms: Record<string, Room> = {};
const BOARD_SIZE = 7;

io.use((socket, next) => {
    const playerId = socket.handshake.auth.playerId;
    if (!playerId) return next(new Error('missing playerId'));
    socket.data.playerId = playerId;
    next();
})

io.on("connection", (socket: Socket) => {
    console.log(`user connected with the id: ${socket.id}`);



    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
