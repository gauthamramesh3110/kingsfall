import Main from "./components/Game";
import { io } from "socket.io-client";

export default function Home() {

  const socket = io("http://localhost:8080");

  socket.on("connect", () => {
    console.log("Connected to server with id:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
  // return <Game />;
  return <Main />;
}
