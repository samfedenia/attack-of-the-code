import React, { useContext } from "react";
import styles from "./css/Game.module.css";
import { GameContext } from "./context/game";

const Prompt = () => {
  const { gameState } = useContext(GameContext);
  const {
    timeLimit,
    gameStatus, //setup, playing, between, gameover
    level,
    totalRounds,
    challenges,
    currentRound,
  } = gameState;

  return (
    <div className={styles.prompt}>
      <div className={styles.challenge}>
        <p>{challenges[currentRound].prompt}</p>
      </div>
    </div>
  );
};

export default Prompt;
