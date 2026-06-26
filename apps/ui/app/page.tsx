'use client';
import { useEffect, useState } from "react";
import { playerId } from "./lib/socket";

export default function Home() {
  // playerId is resolved from localStorage at module load, which only happens
  // in the browser. Read it after mount to avoid an SSR hydration mismatch.
  const [id, setId] = useState("");
  useEffect(() => setId(playerId), []);

  const copyId = () => {
    navigator.clipboard.writeText(id).then(() => console.log('ID Copied')).catch(() => console.log("Error Copying ID"));
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-2/5 mt-10 flex items-center border-2 border-border-seat rounded-xl p-4 bg-surface-card">
        <div className="flex flex-col grow">
          <span className="mb-1 text-text-muted uppercase font-medium">Your Player ID:</span>
          <span className="text-gilt text-xl font-medium uppercase">{id}</span>
        </div>
        <button className="cursor-pointer border-2 border-border-seat rounded-md px-3 py-1 text-text-muted font-medium uppercase h-fit" onClick={copyId}>Copy</button>
      </div>
      <div className="mt-10 w-2/5 flex flex-col">
        <span className="mb-2 ml-1 text-text-muted uppercase font-medium">Challenge a player:</span>
        <div className="flex">
          <input type="text" className="border-2 border-border-seat rounded-xl p-4 mr-4 grow font-medium uppercase"></input>
          <button className="cursor-pointer uppercase font-medium bg-gilt text-surface-card px-4 rounded-xl">Challenge</button>
        </div>
      </div>
    </div>
  );
}
