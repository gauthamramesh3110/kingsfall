import Board from "./Board";
import RoundTimer from "./RoundTimer";

export default function Game() {
    return (
        <div className="flex h-screen">
            <div className="flex flex-col items-center justify-center gap-6 w-fit h-full px-20">
                <RoundTimer />
                <Board />
            </div>
        </div>
    )
}
