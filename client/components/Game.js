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
import Prompt from './Prompt';
import Editor from './Editor';

const Game = () => {
  // // socket connection logic
  // const socket = useContext(SocketContext);
  // const newRoomCode = Math.random().toString(36).slice(-5);
  // socket.emit("room", newRoomCode, "anon");

  return (
    <div className={styles.game}>
      <Prompt />
      <Editor />
      <h1>game</h1>
    </div>
  );
};

export default Game;
