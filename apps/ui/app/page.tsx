'use client';

import Game from "./components/Game";
import InitializeMatch from "./components/InitializeMatch";
import { useGameState } from "./state/game";

export default function Home() {
  const isGameActive = useGameState(state => state.isGameActive);

  return isGameActive ? <Game /> : <InitializeMatch />;
}
