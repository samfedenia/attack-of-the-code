import React, { useState, useEffect } from "react";
import styles from "./css/Podium.module.css";

const Podium = ({ playerList }) => {
  const [topThree, setTopThree] = useState([]);

  useEffect(() => {
    if (topThree.length === 0) {
      setTopThree([playerList[0], playerList[1], playerList[2]]);
    }
  }, [playerList]);

  console.log("Podium Player List:", playerList);
  return (
    <div className={styles.outerContainer}>
      <h1 className={styles.winner} style={{ color: "yellow" }}>
        Winner is {topThree[0]?.playerName}!!!!
      </h1>
      <div className={styles.podiumContainer}>
        <div className={styles.standContainer}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={`/star_wars_characters/${topThree[1]?.avatar}`}
            />
          </div>
          <div id={styles.second} className={styles.stand}></div>
        </div>

        <div className={styles.standContainer}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={`/star_wars_characters/${topThree[0]?.avatar}`}
            />
          </div>
          <div id={styles.first} className={styles.stand}></div>
        </div>

        <div className={styles.standContainer}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={`/star_wars_characters/${topThree[2]?.avatar}`}
            />
          </div>
          <div id={styles.third} className={styles.stand}></div>
        </div>
        </div>
    </div>
  );
};

export default Podium;
