import { useEffect, useState } from "react";
import { useGameState } from "../state/game";
import { playerId, submitMoves } from "../lib/socket";
import { getTeamByPlayerId, getTentativeMovesForPlayer } from "../helpers/helpers";

/**
 * Display-only countdown synced to the server clock. The server is authoritative
 * on when a round ends; this never decides that. When the offset-corrected
 * countdown hits 0 we auto-submit the player's tentative moves exactly once.
 */
export default function RoundTimer() {
    const round = useGameState((state) => state.round);
    const [remainingMs, setRemainingMs] = useState(0);

    useEffect(() => {
        if (!round) return;

        const tick = () => {
            // Read fresh store state each tick so the buzzer submit captures the
            // latest tentative moves rather than a stale closure.
            const state = useGameState.getState();
            const current = state.round;
            if (!current) return;

            const remaining = current.endsAt - (Date.now() + state.clockOffset);
            setRemainingMs(Math.max(0, remaining));

            if (remaining <= 0 && state.submittedRoundId !== current.roundId) {
                const { room, roomId, tentativeMoves } = state;
                if (room && roomId) {
                    const team = getTeamByPlayerId(room, playerId);
                    const moves = team ? getTentativeMovesForPlayer(room, tentativeMoves, team) : [];
                    submitMoves(roomId, current.roundId, moves);
                    state.markSubmitted(current.roundId);
                }
            }
        };

        tick();
        const id = setInterval(tick, 100);
        return () => clearInterval(id);
    }, [round?.roundId]);

    if (!round) return null;

    const seconds = Math.ceil(remainingMs / 1000);
    const pct = Math.max(0, Math.min(1, remainingMs / round.durationMs));

    return (
        <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-mono tabular-nums">{seconds}s</span>
            <div className="w-48 h-2 bg-square-dark rounded-full overflow-hidden">
                <div
                    className="h-full bg-gilt ease-linear"
                    style={{ width: `${pct * 100}%`, transition: "width 100ms linear" }}
                />
            </div>
        </div>
    );
}
