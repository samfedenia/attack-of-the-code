import React, { useState, useEffect, useContext } from "react";
import "materialize-css";
import styles from "./css/Game.module.css";
import { SocketContext } from "./context/socket";

const PlayerList = () => {
  const socket = useContext(SocketContext);

  const [playerList, updatePlayerList] = useState([]);

  useEffect(() => {
    // first thought on refreshing player list after refresh... probably delete.
    socket.on("user-list", (allPlayers) => {
      updatePlayerList(allPlayers);
      if (playerList.length === 0) updatePlayerList(allPlayers);
    });
  }, []);

  useEffect(() => {
    socket.on("user-list", (allPlayers) => {
      updatePlayerList(allPlayers);
      if (playerList.length === 0) updatePlayerList(allPlayers);
    });
    console.log('playerList', playerList)
  }, [playerList]);
  return (
    <div className={styles.playerList}>
      <div className={styles.players}>
        {playerList.map((player, idx) => (
          <div key={idx} className="animate__animated animate__bounceInUp" style={{marginBottom: "0.25rem"}}>
          <div className={styles.player}>
            <div className={styles.playerOuterAvatar}>
              <div className={styles.playerInnerAvatar}
              style={{
              backgroundImage: `url(/star_wars_characters/${player.avatar})`,
            }}></div>
          </div>
            <div className={styles.playerName}>
              {player.playerName}
            </div> 
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
