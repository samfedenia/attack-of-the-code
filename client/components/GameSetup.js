import React, { useContext, useEffect, useState } from 'react';
import { quotesp } from '../quotes';
import { GameContext, GAME_ACTIONS } from './context/game';
import { UserContext } from './context/user';
import { SocketContext } from './context/socket';
import axios from 'axios';
import {
  Container,
  Button,
  TextInput,
  Dropdown,
  Divider,
  Icon,
} from 'react-materialize';

const GameSetup = () => {
  const idx = Math.floor(Math.random() * quotesp.length);
  const { gameState, gameDispatch } = useContext(GameContext);
  const { userState } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const [level, setLevel] = useState('');
  const [totalRounds, setTotalRounds] = useState('');
  const arrayOfLevels = [
    'demo',
    'youngling',
    'padawan',
    'jedi',
    'master',
    'sith',
  ];

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
            onChange={(e) => setLevel(e.target.value)}
            className="browser-default"
          >
            <option value="" defaultValue>
              --Choose Level--
            </option>
            {arrayOfLevels.map((lev, idx) => (
              <option key={idx} value={lev}>
                {lev}
              </option>
            ))}
          </select>
          <select
            name="rounds"
            value={totalRounds}
            onChange={(e) => setTotalRounds(e.target.value)}
            className="browser-default"
          >
            <option value="" defaultValue>
              --Choose Number of Rounds--
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <button type="submit" disabled={!totalRounds || !level}>
            Play the game
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameSetup;
