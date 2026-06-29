import { Room, Team } from "protocol";

export function getTeamByPlayerId(room: Room, playerId: string): Team | undefined {
    return (Object.entries(room.seats).find(([, seatPlayerId]) => seatPlayerId === playerId)?.[0] as Team | undefined);
}