import { io } from "socket.io-client";

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

export const socket = io("http://localhost:8080", {
  auth: { playerId },
});

socket.on("disconnect", () => {
  console.log("Disconnected!");
});
