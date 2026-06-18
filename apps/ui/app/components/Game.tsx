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

    const [nextMoves, setNextMoves] = useState<Map<Piece, [number, number, number, number]>>(new Map());

    const addMove = (piece: Piece,fromRow: number, fromCol: number, toRow: number, toCol: number) => {
        setNextMoves(prev => {
            const newMoves = new Map(prev);
            newMoves.set(piece, [fromRow, fromCol, toRow, toCol]);
            return newMoves;
        });
    };


    return (
        <div className="flex">
            <div className="w-1/2 h-screen grid place-items-center">
                <Board boardState={boardState} addMove={addMove} />
            </div>
            <div className="w-1/2 h-screen">
                <h2 className="text-2xl font-bold mb-4">Next Moves:</h2>
                <ul className="list-disc list-inside">
                    {Array.from(nextMoves.entries()).map(([piece, [fromRow, fromCol, toRow, toCol]], index) => (
                        <li key={index}>
                            Move from ({fromRow}, {fromCol}) to ({toRow}, {toCol})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}