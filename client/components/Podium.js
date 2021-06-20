import React, {} from 'react';
import styles from "./css/Podium.module.css";


const Podium = ({ playerList }) => {
    const topThree = [playerList[0], playerList[1], playerList[2]]
    
    console.log('Podium Player List:', playerList)
    return (
        <div className={styles.podiumContainer}>
        <h1 style={{color: 'yellow'}}>Winner is {topThree[0].playerName}!!!!</h1>
        <div className={styles.standContainer}>
            <div className={styles.avatarContainer}>
                <img className={styles.avatar} src={`/star_wars_characters/${topThree[1]?.avatar}`} />
            </div>
            <div id={styles.second} className={styles.stand}></div>
        </div>

        <div className={styles.standContainer}>
            <div className={styles.avatarContainer}>
                <img className={styles.avatar} src={`/star_wars_characters/${topThree[0]?.avatar}`} />
            </div>
            <div id={styles.first} className={styles.stand}></div>
        </div>

        <div className={styles.standContainer}>
            <div className={styles.avatarContainer}>
                <img className={styles.avatar} src={`/star_wars_characters/${topThree[2]?.avatar}`} />
            </div>
            <div id={styles.third} className={styles.stand}></div>
        </div>
    </div>
    )
}

export default Podium
