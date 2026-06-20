'use client'

import { useBoardState } from "../state/boardState";
import Board from "./Board";

export default function Game() {
    return (
        <div className="flex">
            <div className="w-1/2 h-screen grid place-items-center">
                <Board />
            </div>
            <div className="w-1/2 h-screen flex flex-col gap-4 p-4 overflow-y-auto">
                <button className="px-4 py-2 bg-gilt text-black rounded-lg" onClick={() => useBoardState.getState().reconcileTentativeMove()}>Reconcile Tentative Move</button>
            </div>
        </div>
    );
}