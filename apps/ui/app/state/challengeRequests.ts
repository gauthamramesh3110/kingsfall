import { create } from "zustand";

interface ChallengeRequestState {
    challengeRequests: string[];
    addChallenge: (challengerId: string) => void;
}

export const useChallengeRequests = create<ChallengeRequestState>((set) => ({
    challengeRequests: [],
    addChallenge: (challengerId) => {
        set((state) => ({
            challengeRequests: [...state.challengeRequests, challengerId]
        }))
    }
}))