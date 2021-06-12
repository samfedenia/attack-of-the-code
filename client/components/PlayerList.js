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
          <div className={styles.player} key={idx}>
            <img src={`/star_wars_characters/${player.avatar}`}/>{player.playerName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
