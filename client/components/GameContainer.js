import React, { useEffect, useContext } from 'react';
import 'materialize-css';
import { Container } from 'react-materialize';
import styles from './css/Game.module.css';
import { SocketContext } from './context/socket';
import { GameContext, GAME_ACTIONS } from "./context/game";
import PlayerList from './PlayerList';
import Chat from './Chat';
import Game from './Game';

const GameContainer = () => {
  const socket = useContext(SocketContext);

  const { gameDispatch } = useContext(GameContext);

  useEffect(() => {
    socket.on('game-state', (gameState) => {
      gameDispatch({ type: GAME_ACTIONS.SET_GAME, payload: gameState });
      window.sessionStorage.setItem('gameStatus', JSON.stringify(gameState));
    });

    return () => {
      socket.off('game-state');
    };
  }, []);

  return (
    // <Container className={styles.container}>
    //   <PlayerList />
    //   <Game />
    //   <Chat />
    // </Container>
    <div className="grid-container">
        <div className="grid-item grid-item-1"><PlayerList /></div>
        <div className="grid-item grid-item-2"><Game /></div>
        <div className="grid-item grid-item-3">
          <marquee scrollamount=
          '10' className="marquee-sw">May the Force be with You</marquee>
          <Chat />
        </div>
    </div>
  );
};

export default GameContainer;
