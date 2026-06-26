import Board from "./Board";

export default function Game() {
    return (
        <div className="flex h-screen">
            <div className="flex items-center justify-center w-fit h-full px-20">
                <Board />
            </div>
        </div>
    )
}