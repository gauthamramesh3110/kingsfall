import type { Room, Team } from "./gameTypes";

export function getTeamByPlayerId(room: Room, playerId: string): Team | undefined {
    return (Object.entries(room.seats).find(([, seatPlayerId]) => seatPlayerId === playerId)?.[0] as Team | undefined);
}
