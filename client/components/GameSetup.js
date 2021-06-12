import React, { useContext, useEffect, useState } from 'react';
import { quotesp } from '../quotes';
import { GameContext, GAME_ACTIONS } from './context/game';
import { UserContext } from './context/user';
import { SocketContext } from './context/socket';
import axios from 'axios';

const GameSetup = () => {
  const idx = Math.floor(Math.random() * quotesp.length);
  const { gameState, gameDispatch } = useContext(GameContext);
  const { userState } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const [level, setLevel] = useState('demo');
  const [totalRounds, setTotalRounds] = useState(2);
  const arrayOfLevels = ['youngling', 'padawan', 'jedi', 'master', 'sith'];

  const changeGameState = async (e) => {
    e.preventDefault();
    const { data: challenges } = await axios.get(
      `http://localhost:3000/api/gamedata/${level}/${totalRounds}`
    );

    const newGameState = {
      ...gameState,
      gameStatus: 'playing',
      challenges,
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
      <div>
        <br />"{quotesp[idx]}"<br /> -prof
      </div>
      <div>
        <form onSubmit={changeGameState}>
          <select
            name="level"
            value={level}
            onChange={setLevel}
            className="browser-default"
          >
            <option value="demo">--Choose Level--</option>
            {arrayOfLevels.map((lev, idx) => (
              <option key={idx} value={lev}>
                {lev}
              </option>
            ))}
          </select>
          <button type="submit">Play the game</button>
        </form>
      </div>
    </div>
  );
};

export default GameSetup;
