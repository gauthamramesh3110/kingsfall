import { Server, type Socket } from "socket.io";

interface Room {
    players: string[];
    gameState: unknown | null;
}

interface JoinRoomResponse {
    success: boolean;
    roomId: string;
}

const io = new Server(8080, { cors: { origin: "*" } });
const rooms: Record<string, Room> = {};

io.on("connection", (socket: Socket) => {
    console.log("a user connected");

    socket.on(
        "joinRoom",
        (roomId: string, callback: (response: JoinRoomResponse) => void) => {
            socket.join(roomId);

            let room = rooms[roomId];
            if (!room) {
                room = { players: [], gameState: null };
                rooms[roomId] = room;
            }

            room.players.push(socket.id);
            console.log(`User ${socket.id} joined room ${roomId}`);
            callback({ success: true, roomId });
        }
    );

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
