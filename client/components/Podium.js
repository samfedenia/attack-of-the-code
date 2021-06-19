import React from 'react';
import styles from "./css/Podium.module.css";


const Podium = () => {
    return (
        <div className={styles.podiumContainer}>

        <div className={styles.standContainer}>
            <div className={styles.avatarContainer}>
                <img className={styles.avatar} src='https://attack-of-the-code.com/star_wars_characters/star_wars_heads_0002_Layer-5.png' />
            </div>
            <div id={styles.second} className={styles.stand}></div>
        </div>

        <div className={styles.standContainer}>
            <div className={styles.avatarContainer}>
                <img className={styles.avatar} src='https://attack-of-the-code.com/star_wars_characters/star_wars_heads_0003_Layer-6.png' />
            </div>
            <div id={styles.first} className={styles.stand}></div>
        </div>

        <div className={styles.standContainer}>
            <div className={styles.avatarContainer}>
                <img className={styles.avatar} src='https://attack-of-the-code.com/star_wars_characters/star_wars_heads_0004_Layer-7.png' />
            </div>
            <div id={styles.third} className={styles.stand}></div>
        </div>
    </div>
    )
}

export default Podium
