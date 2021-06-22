import React, { useEffect, useContext, useState } from 'react';
import 'materialize-css';
import styles from './css/Game.module.css';
import { SocketContext } from './context/socket';
import { UserContext } from './context/user';

const PlayerList = ({ playerList }) => {
  const socket = useContext(SocketContext);
  const { userState } = useContext(UserContext);

  // const [playerList, setPlayerList] = useState([]);

  // useEffect(() => {
  //   socket.on('user-list', (allPlayers) => {
  //     const allplayersFiltered = allPlayers.sort((a, b) => b.score - a.score);

  //     setPlayerList(allplayersFiltered);
  //   });
  // }, []);

  return (
    <div className={styles.playerList}>
      <div className={styles.players}>
        {playerList.map((player, idx) => (
          <div
            key={idx}
            className='animate__animated animate__bounceInUp'
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
              <div
                className={
                  player.socketId === socket.id
                    ? styles.playerNameSelected
                    : styles.playerName
                }
              >
                {player.socketId === socket.id ? (
                  <span>&nbsp;&#9734;&nbsp;</span>
                ) : null}
                {player.playerName}: {player.score}&nbsp;
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
