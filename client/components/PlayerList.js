import React, { useEffect, useContext, useState } from "react";
import "materialize-css";
import styles from "./css/Game.module.css";
import { SocketContext } from "./context/socket";
import { PlayerlistContext, PlayerlistProvider } from "./context/playerlist";

const PlayerList = () => {
  const socket = useContext(SocketContext);
  const { playerlistState } = useContext(PlayerlistContext);

  return (
    <div className={styles.playerList}>
      <div className={styles.players}>
        {playerlistState.map((player, idx) => (
          <div
            key={idx}
            className='animate__animated animate__bounceInUp'
            style={{ marginBottom: "0.25rem" }}
          >
            <div className={styles.player}>
              <div
                className={
                  player.socketId === socket.id
                    ? styles.playerNameSelected
                    : styles.playerName
                }
                style={{
                  fontFamily: `${player.font === "Aurebesh" ? "Aurebesh" : ""}`,
                }}
              >
                <div className={styles.playerOuterAvatar}>
                  <div
                    className={styles.playerInnerAvatar}
                    style={{
                      backgroundImage: `url(/star_wars_characters/${player.avatar})`,
                    }}
                  ></div>
                </div>
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
