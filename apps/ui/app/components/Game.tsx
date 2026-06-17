'use client'

import { useState } from "react";
import Board from "./Board";

import { Piece, PieceType, Team } from "./gameTypes";

const enemyRow = [
    null,
    { type: 'R', team: 'enemy' },
    { type: 'N', team: 'enemy' },
    { type: 'K', team: 'enemy' },
    { type: 'Q', team: 'enemy' },
    { type: 'B', team: 'enemy' },
    null
] as (Piece | null)[];


const yourRow = [
    null,
    { type: 'R', team: 'you' },
    { type: 'N', team: 'you' },
    { type: 'K', team: 'you' },
    { type: 'Q', team: 'you' },
    { type: 'B', team: 'you' },
    null
] as (Piece | null)[];


const initBoardArray: (Piece | null)[][] = [
    enemyRow,
    ...Array.from({ length: 5 }, () => Array<Piece | null>(7).fill(null)),
    yourRow,
];


export default function Main() {
    const [boardState, setBoardState] = useState<(Piece | null)[][]>(
        initBoardArray
    );

    const updateBoard = (newBoard: (Piece | null)[][]) => {
        // setBoardState(newBoard);
    }


    return (
        <div className="flex">
            <div className="w-1/2 h-screen grid place-items-center">
                <Board boardState={boardState} updateBoard={updateBoard} />
            </div>
            <div className="w-1/2 h-screen">Right</div>
        </div>
    );
}