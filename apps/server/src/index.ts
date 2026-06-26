import { Server, type Socket } from "socket.io";
import type { Piece, Room } from "protocol";
import { randomUUID } from "crypto";
import { initialPostition } from "./initialPosition.js";

const io = new Server(8080, { cors: { origin: "*" } });
const rooms: Record<string, Room> = {};

const playerSocketIds = new Map<string, string>();

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

    socket.on("challenge", (opponentId: string) => {
        console.log(`Player ID: ${playerId} challenges ${opponentId}`);
        const opponentSocketId = playerSocketIds.get(opponentId);
        if (opponentSocketId) {
            console.log("sending challenge to", opponentSocketId);
            io.to(opponentSocketId).emit("challenge", playerId);
        } else {
            console.log(`No socket found for player ${opponentId}`);
        }
    });

    socket.on("acceptChallenge", (challengerId: string) => {
        const challengerSocketId = playerSocketIds.get(challengerId);
        const accepterSocketId = playerSocketIds.get(playerId);

        if (challengerSocketId && accepterSocketId) {
            const roomId = randomUUID();
            const room: Room = {
                seats: {
                    blue: challengerId,
                    red: playerId,
                },
                board: initialPostition
            }
            rooms[roomId] = room;
            io.sockets.sockets.get(challengerSocketId)?.join(roomId);
            io.sockets.sockets.get(accepterSocketId)?.join(roomId);

            io.to(roomId).emit("matchStarted", {
                roomId,
                room
            });

            console.log(`Match ${roomId} started: blue=${challengerId} red=${playerId}`);
        }
    })

    socket.on("disconnect", () => {
        playerSocketIds.delete(playerId);
        console.log("user disconnected");
    });
});
