'use client';
import { useRoomState } from "../state/roomState";
import { socket } from "../lib/socket";
import { useState } from "react";

export default function RoomJoin() {
    const setRoomId = useRoomState(state => state.setRoomId);
    const [roomId, setRoomIdInput] = useState("");

    const joinRoom = () => {
        if (roomId.trim() === "") return;

        socket.emit("joinRoom", roomId, (response: { success: boolean }) => {
            if (response.success) {
                setRoomId(roomId);
            }
        });
    };

    return (
        <div className="w-full h-screen grid place-items-center">
            <h1 className="text-4xl font-bold">Join a Room</h1>
            <input
                type="text"
                placeholder="Enter Room ID"
                className="mt-4 px-4 py-2 border rounded-lg"
                value={roomId}
                onChange={(e) => setRoomIdInput(e.target.value)}
            />
            <button className="mt-4 px-4 py-2 bg-gilt text-black rounded-lg" onClick={joinRoom}>
                Join
            </button>
        </div>
    );
}