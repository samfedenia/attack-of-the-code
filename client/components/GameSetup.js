import React, { useContext, useEffect } from 'react';
import { quotesp } from '../quotes';
import { GameContext } from './context/game';


const GameSetup = () => {
  const idx = Math.floor(Math.random() * quotesp.length);
  const [gameState, setGameState] = useContext(GameContext);

  const changeGameState = () => {
    const newGameState = {
      ...gameState,
      gameStatus: "playing",
    };
    setGameState(newGameState);
    window.sessionStorage.setItem('gameStatus', JSON.stringify(newGameState));
  };

  useEffect(() => {
    const game = JSON.parse(window.sessionStorage.getItem('gameStatus'));
    if (game) setGameState(game);
  }, []);

  return (
    <div>
      <br />
      {quotesp[idx]}<br /> -prof
      <div>
        <button onClick={changeGameState}>Play the game</button>
      </div>
    </div>
  );
};

export default GameSetup;
