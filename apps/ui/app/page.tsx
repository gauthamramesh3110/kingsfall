'use client';
import Game from "./components/Game";
import { socket } from "./lib/socket";
import { useRoomState } from "./state/roomState";
import RoomJoin from "./components/RoomJoin";

export default function Home() {
  const roomId = useRoomState(state => state.roomId);
  const playerId = useRoomState(state => state.playerId);

  socket.on("connect", () => {
    useRoomState.getState().setPlayerId(socket.id || null);
    console.log("Connected to server with id:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });


  return playerId ? (roomId ? <Game /> : <RoomJoin />) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl font-bold">Connecting to server...</p>
    </div>
  );
}
