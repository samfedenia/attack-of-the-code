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
import { SocketContext } from '../components/context/socket';
import { UserContext } from './context/user';

const PlayerList = () => {
  // // socket connection logic
  const socket = useContext(SocketContext);
  const [user, _] = useContext(UserContext);
  console.log(user);

  const [playerList, updatePlayerList] = useState([]);

  useEffect(() => {
    socket.on('user-list', (allPlayers) => {
      console.log('playerlist: ', playerList);
      console.log('allplayers', allPlayers);
      updatePlayerList(allPlayers);
      if (playerList.length === 0) updatePlayerList(allPlayers);
    });
  }, [playerList]);

  return (
    <div className={styles.playerList}>
      <h3>playerList</h3>
      <div className={styles.players}>
        {playerList.map((player, idx) => (
          <div className={styles.player} key={idx}>
            {player}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
