import React, { useEffect, useContext, useState } from 'react';
import 'materialize-css';
import { Container } from 'react-materialize';
import styles from './css/Game.module.css';
import { SocketContext } from './context/socket';
import { GameContext, GAME_ACTIONS } from './context/game';
import { UserContext, USER_ACTIONS } from './context/user';
import PlayerList from './PlayerList';
import Chat from './Chat';
import Game from './Game';
import GameSetup from './GameSetup';
import Between from './Between';
import GameStateHandler from './GameStateHandler';
import Podium from './Podium';

const GameContainer = () => {
  const [submissionState, setSubmissionState] = useState(0);

  const socket = useContext(SocketContext);

  const { gameState, gameDispatch } = useContext(GameContext);
  const { userState, userDispatch } = useContext(UserContext);

  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    socket.on('user-list', (allPlayers) => {
      const allplayersFiltered = allPlayers.sort((a, b) => b.score - a.score);

      setPlayerList(allplayersFiltered);
    });
  }, []);

  useEffect(() => {
    socket.on('game-state', (gameState) => {
      gameDispatch({ type: GAME_ACTIONS.SET_GAME, payload: gameState });
      window.sessionStorage.setItem('gameStatus', JSON.stringify(gameState));
    });

    return () => {
      socket.off('game-state');
      socket.off('answer-total-update');
    };
  }, []);

  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    const game = JSON.parse(window.sessionStorage.getItem('gameStatus'));
    if (user) {
      userDispatch({
        type: USER_ACTIONS.UPDATE_USER,
        payload: user,
      });
      document.body.style.background = `url(/backgrounds/${user.background}), linear-gradient(rgba(5, 8, 46, 0.712), rgba(53, 0, 0, 0.801))`;
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center center';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundAttachment = 'fixed';
    }
    if (game) gameDispatch({ type: GAME_ACTIONS.SET_GAME, payload: game });
  }, []);

  return (
    <div className="grid-container">
      <div className="grid-item grid-item-1">
        <PlayerList playerList={playerList}/>
      </div>
      <div className="grid-item grid-item-2">
        {gameState.gameStatus === 'gameover' && <Podium playerList={playerList} />}
        {gameState.gameStatus === 'setup' && <GameSetup playerList={playerList}/>}
        {gameState.gameStatus === 'playing' && (
          <Game
            submissionState={submissionState}
            setSubmissionState={setSubmissionState}
          />
        )}
        {gameState.gameStatus === 'between' && <Between 
            submissionState={submissionState}
            setSubmissionState={setSubmissionState}
        />}
        <GameStateHandler
          submissionState={submissionState}
          setSubmissionState={setSubmissionState}
        />
      </div>
      <div className="grid-item grid-item-3">
        <marquee scrollamount="10" className="marquee-sw">
          May the Force be with You
        </marquee>
        <Chat />
      </div>
    </div>
  );
};

export default GameContainer;
