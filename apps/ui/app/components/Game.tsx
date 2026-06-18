'use client'

import Board from "./Board";

export default function Main() {
    return (
        <div className="flex">
            <div className="w-1/2 h-screen grid place-items-center">
                <Board />
            </div>
            <div className="w-1/2 h-screen flex flex-col gap-4 p-4 overflow-y-auto">

            </div>
        </div>
    );
}