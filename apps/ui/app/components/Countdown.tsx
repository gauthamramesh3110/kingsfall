import { useEffect, useState } from "react";
import { useGameState } from "../state/game";

export default function Countdown() {
    const roundEnd = useGameState(state => state.roundEnd);
    const [timeLeft, setTimeLeft] = useState(10);
    useEffect(() => {
        const id = setInterval(() => {
            const now = new Date();
            const secondsLeft = Math.round((roundEnd.getTime() - now.getTime()) / 1000);
            setTimeLeft(secondsLeft)
        }, 100)
        return () => clearInterval(id)
    }, [roundEnd])

    return (
        <div>
            {timeLeft}
        </div>
    );
}