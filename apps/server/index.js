import { Server } from "socket.io";

const io = new Server(8080, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("joinRoom", (roomId, callback) => {
        socket.join(roomId);
        callback({ success: true });
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});