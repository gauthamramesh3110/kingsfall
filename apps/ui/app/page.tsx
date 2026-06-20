'use client';
import Game from "./components/Game";
import { socket } from "./lib/socket";
import { useRoomState } from "./state/roomState";
import RoomJoin from "./components/RoomJoin";

export default function Home() {
  const roomId = useRoomState(state => state.roomId);

  socket.on("connect", () => {
    console.log("Connected to server with id:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });


  return (roomId ? <Game /> : <RoomJoin />);
}
