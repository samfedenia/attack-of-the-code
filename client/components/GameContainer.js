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
import PlayerList from './PlayerList';
import Chat from './Chat';
import Game from './Game';

const GameContainer = () => {
  // socket connection logic
  // const socket = useContext(SocketContext);
  // const newRoomCode = Math.random().toString(36).slice(-5);
  // socket.emit("room", newRoomCode, "anon");
  const [gameState, setGameState] = useContext(GameContext);
  return (
    <Container className={styles.container}>
      <PlayerList />
      <Game />
      <Chat />
    </Container>
  );
};

export default GameContainer;
