import React, { useContext, useEffect } from 'react';
import { quotesp } from '../quotes';
import { GameContext, GAME_ACTIONS } from './context/game';
import { UserContext } from './context/user';
import { SocketContext } from './context/socket';

const GameSetup = () => {
  const idx = Math.floor(Math.random() * quotesp.length);
  const { gameState, gameDispatch } = useContext(GameContext);
  const { userState } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const changeGameState = () => {
    const newGameState = {
      ...gameState,
      gameStatus: 'playing',
    };
    gameDispatch({ type: GAME_ACTIONS.SET_GAME, payload: newGameState });
    socket.emit('new-game-state', newGameState, userState.roomCode);
    window.sessionStorage.setItem('gameStatus', JSON.stringify(newGameState));
  };

  useEffect(() => {
    const game = JSON.parse(window.sessionStorage.getItem('gameStatus'));
    if (game) gameDispatch({ type: GAME_ACTIONS.SET_GAME, payload: game });
  }, []);

  return (
    <div>
      <br />"{quotesp[idx]}"<br /> -prof
      <div>
        <button onClick={changeGameState}>Play the game</button>
      </div>
    </div>
  );
};

export default GameSetup;
