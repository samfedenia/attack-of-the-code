import React, { useState, useEffect, useContext } from "react";
import styles from "./css/Podium.module.css";
import { PlayerlistContext } from "./context/playerlist";

const Podium = () => {
  const { playerlistState } = useContext(PlayerlistContext);
  const [topThree, setTopThree] = useState([]);

  useEffect(() => {
    document.body.style.background = `url(/jedi-prof.png), linear-gradient(rgba(5, 8, 46, 0.712), rgba(53, 0, 0, 0.801))`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
  }, []);

  useEffect(() => {
    if (topThree.length === 0) {
      setTopThree([playerlistState[0], playerlistState[1], playerlistState[2]]);
    }
  }, [playerlistState]);

  return (
    <div className={styles.outerContainer}>
      <h1 className={styles.winner} style={{ color: "yellow" }}>
        Winner is {topThree[0]?.playerName}!!!!
      </h1>
      <div className={styles.podiumContainer}>
        <div
          className={styles.standContainer}
          hidden={playerlistState.length < 2}
        >
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={`/star_wars_characters/${topThree[1]?.avatar}`}
            />
          </div>
          <div id={styles.second} className={styles.stand}>
            <div className={styles.standName}>{topThree[1]?.playerName}</div>
          </div>
        </div>

        <div className={styles.standContainer}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={`/star_wars_characters/${topThree[0]?.avatar}`}
            />
          </div>
          <div id={styles.first} className={styles.stand}>
            <div className={styles.standName}>{topThree[0]?.playerName}</div>
          </div>
        </div>

        <div
          className={styles.standContainer}
          hidden={playerlistState.length < 3}
        >
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={`/star_wars_characters/${topThree[2]?.avatar}`}
            />
          </div>
          <div id={styles.third} className={styles.stand}>
            <div className={styles.standName}>{topThree[2]?.playerName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podium;
