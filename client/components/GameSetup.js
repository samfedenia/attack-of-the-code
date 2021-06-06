import React, { useContext, useEffect, useRef } from 'react';
import { quotesp } from '../quotes';
import { GameContext } from './context/game';
import { UserContext } from './context/user';
import { SocketContext } from './context/socket';

const GameSetup = () => {
  const idx = Math.floor(Math.random() * quotesp.length);
  const [gameState, setGameState] = useContext(GameContext);
  const [userState, setUserState] = useContext(UserContext);
  const socket = useContext(SocketContext);

  const changeGameState = () => {
    const newGameState = {
      ...gameState,
      gameStatus: "playing",
    };
    setGameState(newGameState);
    socket.emit('new-game-state', newGameState, userState.roomCode)
    window.sessionStorage.setItem('gameStatus', JSON.stringify(newGameState));
  };

  useEffect(() => {
    const game = JSON.parse(window.sessionStorage.getItem('gameStatus'));
    if (game) setGameState(game);
  }, []);

  return (
    <div>
      <br />
      "{quotesp[idx]}"<br /> -prof
      <div>
        <button onClick={changeGameState}>Play the game</button>
      </div>
    </div>
  );
};

export default GameSetup;
