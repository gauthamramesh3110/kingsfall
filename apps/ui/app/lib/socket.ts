import { io } from "socket.io-client";
import { useRoomState } from "../state/roomState";
import { useBoardState } from "../state/boardState";
import { Piece } from "protocol";

export const socket = io("http://localhost:8080");

// Listeners are attached synchronously here, before the async connection can
// complete, so the `connect` event is never missed.
socket.on("connect", () => {
  useRoomState.getState().setPlayerId(socket.id || null);
});

socket.on("disconnect", () => {
  useRoomState.getState().setPlayerId(null);
});

socket.on("updateBoardState", (boardState: Record<string, Piece[]>) => {
  const yourPieces = boardState[socket.id!];

  const keys = Object.keys(boardState);
  const enemyPieces = keys.length === 2 ? boardState[keys.find(k => k !== socket.id!)!] : [];

  useBoardState.getState().updateBoardState(yourPieces, enemyPieces);
  console.log(boardState)
})
