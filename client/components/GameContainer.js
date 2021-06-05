import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import 'materialize-css';
import {
  Container,
  Button,
  TextInput,
  Dropdown,
  Divider,
  Icon,
  Card,
  Row,
  Col,
  Select,
} from 'react-materialize';
import Cycle from './Cycle';
import styles from './css/Game.module.css';
import { SocketContext } from './context/socket';
import { GameContext } from './context/game';
// import { UserContext } from './context/user';
import PlayerList from './PlayerList';
import Chat from './Chat';
import Game from './Game';

const GameContainer = () => {
  const socket = useContext(SocketContext);

  const [gameState, setGameState] = useContext(GameContext);

  useEffect(() => {
    socket.on('game-state', (gameState) => {
      setGameState(gameState);
      window.sessionStorage.setItem('gameStatus', JSON.stringify(gameState))
    });

    return () => {
      socket.off('game-state');
    };
  }, [])


  return (
    <Container className={styles.container}>
      <PlayerList />
      <Game />
      <Chat />
    </Container>
  );
};

export default GameContainer;
