import React, { useContext } from 'react';
import { quotesprof } from '../quotes';
import { GameContext } from './context/game';


const GameSetup = () => {
  const idx = Math.floor(Math.random() * quotesprof.length);
  const [gameState, setGameState] = useContext(GameContext);

  const changeGameState = () => {
    setGameState({
      ...gameState,
      gameStatus: 'playing'
    })
  }

  return (
    <div>
      F this browser<br />
      {quotesprof[idx]}
      <div>
        <button onClick={changeGameState}>Play the game</button>
      </div>
    </div>
  );
};

export default GameSetup;
