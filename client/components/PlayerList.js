import React, { useState, useEffect, useContext } from 'react';
import 'materialize-css';
import styles from './css/Game.module.css';
import { SocketContext } from './context/socket';

const PlayerList = () => {
  const socket = useContext(SocketContext);

  const [playerList, updatePlayerList] = useState([]);

  useEffect(() => {
    socket.on('user-list', (allPlayers) => {
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
