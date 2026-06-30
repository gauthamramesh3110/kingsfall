import { io, playerSocketIds, rooms, type TypedSocket } from ".";
import { randomUUID } from "crypto";
import { initialPosition } from "./initialPosition";
import type { Room } from "protocol";
import { startRounds } from "./rounds";

export function handleChallenge(socket: TypedSocket) {
    const playerId = socket.data.playerId;

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
}

export function handleChallengeAccept(socket: TypedSocket) {
    const playerId = socket.data.playerId;
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
                board: initialPosition
            }
            rooms[roomId] = room;
            io.sockets.sockets.get(challengerSocketId)?.join(roomId);
            io.sockets.sockets.get(accepterSocketId)?.join(roomId);

            io.to(roomId).emit("matchStarted", {
                roomId,
                room
            });

            startRounds(roomId);

            console.log(`Match ${roomId} started: blue=${challengerId} red=${playerId}`);
        }
    })
}