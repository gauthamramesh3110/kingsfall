import { Server, type Socket } from "socket.io";
import type { Piece } from "protocol";

interface Room {
    players: string[];
    boardState: Record<string, Piece[]>;
}
interface JoinRoomResponse {
    success: boolean;
    roomId: string;
}

const io = new Server(8080, { cors: { origin: "*" } });
const rooms: Record<string, Room> = {};
const BOARD_SIZE = 7;

io.on("connection", (socket: Socket) => {
    console.log("a user connected");

    socket.on(
        "joinRoom",
        (roomId: string, callback: (response: JoinRoomResponse) => void) => {
            socket.join(roomId);

            let room = rooms[roomId];
            if (!room) {
                room = { players: [], boardState: {} };
                rooms[roomId] = room;
            }

            // Allowing only two players, each player for a team.
            if (room.players.length >= 2) {
                callback({ success: false, roomId });
                return;
            }

            room.players.push(socket.id);

            if (room.players.length == 1) {
                room.boardState[socket.id] = [
                    { type: 'K', position: { row: 6, col: 0 } },
                    { type: 'R', position: { row: 6, col: 2 } },
                    { type: 'N', position: { row: 6, col: 3 } },
                    { type: 'B', position: { row: 6, col: 4 } },
                    { type: 'Q', position: { row: 6, col: 1 } },
                ]
            } else {
                room.boardState[socket.id] = [
                    { type: 'K', position: { row: 0, col: BOARD_SIZE - 1 } },
                    { type: 'Q', position: { row: 0, col: BOARD_SIZE - 2 } },
                    { type: 'R', position: { row: 0, col: BOARD_SIZE - 3 } },
                    { type: 'N', position: { row: 0, col: BOARD_SIZE - 4 } },
                    { type: 'B', position: { row: 0, col: BOARD_SIZE - 5 } },
                ]
            }

            io.to(roomId).emit('updateBoardState', room.boardState)
            console.log(`User ${socket.id} joined room ${roomId}`);

            callback({ success: true, roomId });
        }
    );

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
