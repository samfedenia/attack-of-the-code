import React, { useContext, useEffect } from "react";
import { GameContext, GAME_ACTIONS } from "./context/game";

function GameStateHandler() {
  const { gameState, gameDispatch } = useContext(GameContext);

  useEffect(() => {
    const {
      timeLimit,
      gameStatus, //setup, playing, between, gameover
      level,
      totalRounds,
      challenges,
      currentRound,
      userSubmissions,
    } = gameState;

    if (userSubmissions === 3) {
      gameDispatch({
        type: GAME_ACTIONS.SET_GAME,
        payload: {
          ...gameState,
          gameStatus: "between",
          currentRound: currentRound + 1,
          userSubmissions: 0,
        },
      });
    } else if (currentRound === totalRounds) {
      gameDispatch({
        type: GAME_ACTIONS.SET_GAME,
        payload: {
          ...gameState,
          gameStatus: "gameover",
          totalRounds: 0,
        },
      });
    }
  }, [gameState]);

  return <></>;
}

export default GameStateHandler;
