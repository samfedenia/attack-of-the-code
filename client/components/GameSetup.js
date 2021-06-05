import React, { useContext, useEffect, useRef } from 'react';
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

  // //trying useRef()
  // const prevGameState = useRef('');

  // const changeGameState = () => {
  //   setGameState({...gameState, gameStatus: "playing"})
  //   window.sessionStorage.setItem('gameStatus', gameState);
  // };
  // useEffect(() => {
  //   prevGameState.current = gameState;
  // }, [gameState])

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
