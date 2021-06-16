import React, { useState, useEffect, useContext } from 'react';
import 'materialize-css';
import styles from './css/Game.module.css';
import { SocketContext } from './context/socket';

const PlayerList = () => {
  const socket = useContext(SocketContext);

  const [playerList, updatePlayerList] = useState([]);

  useEffect(() => {
    socket.on('user-list', (allPlayers) => {
      const sortedPlayers = allPlayers.sort((a, b) => b.score - a.score);
      updatePlayerList(sortedPlayers);
      if (playerList.length === 0) updatePlayerList(sortedPlayers);
    });
  }, []);

  return (
    <div className={styles.playerList}>
      <div className={styles.players}>
        {playerList.map((player, idx) => (
          <div
            key={idx}
            className="animate__animated animate__bounceInUp"
            style={{ marginBottom: '0.25rem' }}
          >
            <div className={styles.player}>
              <div className={styles.playerOuterAvatar}>
                <div
                  className={styles.playerInnerAvatar}
                  style={{
                    backgroundImage: `url(/star_wars_characters/${player.avatar})`,
                  }}
                ></div>
              </div>
              <div className={styles.playerName}>
                {player.playerName}: {player.score}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
