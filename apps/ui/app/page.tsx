'use client';
import Game from "./components/Game";
import "./lib/socket";
import { useRoomState } from "./state/roomState";
import RoomJoin from "./components/RoomJoin";

export default function Home() {
  const roomId = useRoomState(state => state.roomId);
  const playerId = useRoomState(state => state.playerId);


  return playerId ? (roomId ? <Game /> : <RoomJoin />) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl font-bold">Connecting to server...</p>
    </div>
  );
}
