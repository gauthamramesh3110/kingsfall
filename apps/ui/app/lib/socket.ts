import { io, type Socket } from "socket.io-client";
import { useChallengeRequests } from "../state/challengeRequests";
import type { ServerToClientEvents, ClientToServerEvents } from "protocol";
import { useGameState } from "../state/game";

const PLAYER_ID_KEY = "kf.playerId";

// Resolve a persistent anonymous player id at module load, before the socket
// connects, so it can be sent with the handshake (see `auth` below). socket.id
// is ephemeral and changes per connect; this id survives reconnects/refreshes.
// Guarded for SSR: localStorage only exists in the browser.
function getPlayerId(): string {
  if (typeof window === "undefined") return "";

  let playerId = localStorage.getItem(PLAYER_ID_KEY);
  if (!playerId) {
    playerId = crypto.randomUUID();
    localStorage.setItem(PLAYER_ID_KEY, playerId);
  }
  return playerId;
}

export const playerId = getPlayerId();

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:8080",
  {
    auth: { playerId },
  }
);

export const challengePlayer = (opponentId: string) => {
  socket.emit("challenge", opponentId);
}

export const acceptChallenge = (challengerId: string) => {
  socket.emit("acceptChallenge", challengerId);
}

socket.on("challenge", (opponentId: string) => {
  console.log(`Player ${opponentId} challenged you!`);
  useChallengeRequests.getState().addChallenge(opponentId);
})

socket.on("matchStarted", (matchDetails) => {
  console.log("Match has Started!")
  useGameState.getState().setRoomFromServer(matchDetails.roomId, matchDetails.room);
  useGameState.getState().startGame();
})

socket.on("roundStarted", (matchDetails) => {
  useGameState.getState().setRoomFromServer(matchDetails.roomId, matchDetails.room);
})

socket.on("retrieveMoves", (callback) => {
  console.log("Sending Moves");
  const { roomId, tentativeMoves } = useGameState.getState();
  if (!roomId) return;
  callback({
    playerId,
    roomId,
    tentativeMoves
  })
})

socket.on("disconnect", () => {
  console.log("Disconnected!");
});
