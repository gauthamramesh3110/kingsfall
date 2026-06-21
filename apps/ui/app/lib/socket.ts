import { io } from "socket.io-client";
import { useRoomState } from "../state/roomState";

export const socket = io("http://localhost:8080");

// Listeners are attached synchronously here, before the async connection can
// complete, so the `connect` event is never missed.
socket.on("connect", () => {
  useRoomState.getState().setPlayerId(socket.id || null);
});

socket.on("disconnect", () => {
  useRoomState.getState().setPlayerId(null);
});
