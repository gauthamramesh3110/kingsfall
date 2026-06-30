import type { Socket } from "socket.io";
import { ROUND_DURATION_MS } from "protocol";
import type { Move, SubmitMovesPayload } from "protocol";
import { io, rooms } from ".";
import { resolveMoves } from "./resolve.js";

// Extra wall-clock buffer after `endsAt` before the server resolves, so a move
// the client auto-submits *at* the buzzer has time to arrive over the network.
// The timer the player sees still ends at `endsAt`; this is an invisible grace.
const GRACE_MS = 400;

interface RoundRuntime {
    roundId: number;
    endsAt: number;
    timer: NodeJS.Timeout;
    submissions: Map<string, Move[]>; // playerId -> their team's moves (last write wins)
}

const roundRuntimes = new Map<string, RoundRuntime>();

/** Begin a new round for a room: schedule authoritative resolution and broadcast the deadline. */
export function startRound(roomId: string) {
    if (!rooms[roomId]) return;

    const prev = roundRuntimes.get(roomId);
    const roundId = (prev?.roundId ?? 0) + 1;

    const serverNow = Date.now();
    const endsAt = serverNow + ROUND_DURATION_MS;
    const timer = setTimeout(() => resolveRound(roomId), ROUND_DURATION_MS + GRACE_MS);

    roundRuntimes.set(roomId, { roundId, endsAt, timer, submissions: new Map() });

    io.to(roomId).emit("roundStart", {
        roundId,
        serverNow,
        endsAt,
        durationMs: ROUND_DURATION_MS,
    });
    console.log(`Room ${roomId}: round ${roundId} started (endsAt=${endsAt})`);
}

/** Per-connection handler: stash the latest move submission for the current round. */
export function handleSubmitMoves(socket: Socket) {
    const playerId = socket.data.playerId;

    socket.on("submitMoves", ({ roomId, roundId, moves }: SubmitMovesPayload) => {
        const runtime = roundRuntimes.get(roomId);
        // Ignore submissions for an unknown room or a stale/already-resolved round.
        if (!runtime || runtime.roundId !== roundId) return;
        runtime.submissions.set(playerId, moves);
    });
}

/** The buzzer fired: resolve collected moves into a new board, broadcast it, loop. */
function resolveRound(roomId: string) {
    const room = rooms[roomId];
    const runtime = roundRuntimes.get(roomId);
    if (!room || !runtime) return;

    const next = resolveMoves(room.board, runtime.submissions, room.seats);
    room.board = next;

    io.to(roomId).emit("roundResolved", { roundId: runtime.roundId, board: next });
    console.log(`Room ${roomId}: round ${runtime.roundId} resolved`);

    startRound(roomId);
}

/** Cancel a room's round loop (e.g. on disconnect / room teardown) so timers don't leak. */
export function stopRound(roomId: string) {
    const runtime = roundRuntimes.get(roomId);
    if (!runtime) return;
    clearTimeout(runtime.timer);
    roundRuntimes.delete(roomId);
}
