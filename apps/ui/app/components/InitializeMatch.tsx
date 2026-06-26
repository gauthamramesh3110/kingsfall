import { useEffect, useState } from "react";
import { playerId, challengePlayer, acceptChallenge, socket } from "../lib/socket";
import { useChallengeRequests } from "../state/challengeRequests";


export default function InitializeMatch() {
    const [id, setId] = useState("");
    const [opponentId, setOpponentId] = useState("");
    useEffect(() => setId(playerId), []);

    const challengeRequests = useChallengeRequests(state => state.challengeRequests);

    const copyId = () => {
        navigator.clipboard.writeText(id).then(() => console.log('ID Copied')).catch(() => console.log("Error Copying ID"));
    }

    const handleChallengePlayer = () => {
        challengePlayer(opponentId)
    }

    const handleAcceptChallenge = (event: React.MouseEvent<HTMLButtonElement>) => {
        const challengerId = event.currentTarget.value;
        console.log("Accepting Challenge For", challengerId);
        acceptChallenge(challengerId);

    }

    const handleOpponentIdInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOpponentId(event.target.value);
    }
    return (
        <div className="flex flex-col items-center">
            <div className="w-3/5 mt-10 flex items-center border-2 border-border-seat rounded-xl p-4 bg-surface-card">
                <div className="flex flex-col grow">
                    <span className="mb-1 text-text-muted uppercase font-medium">Your Player ID:</span>
                    <span className="text-gilt text-xl font-medium uppercase">{id}</span>
                </div>
                <button className="cursor-pointer border-2 border-border-seat rounded-md px-3 py-1 text-text-muted font-medium uppercase h-fit" onClick={copyId}>Copy</button>
            </div>
            <div className="mt-10 w-3/5 flex flex-col">
                <span className="mb-2 ml-1 text-text-muted uppercase font-medium">Challenge a player:</span>
                <div className="flex">
                    <input type="text" className="border-2 border-border-seat rounded-xl p-4 mr-4 grow font-medium uppercase" value={opponentId} onChange={handleOpponentIdInput}></input>
                    <button className="cursor-pointer uppercase font-medium bg-gilt text-surface-card px-4 rounded-xl" onClick={handleChallengePlayer}>Challenge</button>
                </div>
            </div>
            {
                challengeRequests.map(challengerId => (
                    <div key={challengerId} className="w-3/5 mt-10 flex items-center border-2 border-border-seat rounded-xl p-4 bg-surface-card">
                        <div className="grow">
                            <span className="font-medium uppercase">{challengerId}</span>
                            <span> wants to play with you.</span>
                        </div>
                        <button className="cursor-pointer border-2 border-red-400 seat rounded-md px-3 py-1 text-red-400 font-medium uppercase h-fit" onClick={() => null}>Decline</button>
                        <button className="ml-2 cursor-pointer border-2 border-green-400 rounded-md px-3 py-1 text-green-400 font-medium uppercase h-fit" value={challengerId} onClick={handleAcceptChallenge}>Accept</button>
                    </div>
                ))
            }
        </div>
    );
}