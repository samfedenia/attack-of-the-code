import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './css/Cycle.module.css';

const Cycle = ({ headshots, user, setUser, num, setNum }) => {
    const [wobble, setWobble] = useState(0)

    const goRight = (num) => {
        if (num === headshots.length - 1) {
            setWobble(1)
            setNum(0)
            setUser({...user, avatar: headshots[num]})
        } else {
            setWobble(1)
            setNum(num += 1)
            setUser({...user, avatar: headshots[num]})
        }
    };

    const goLeft = (num) => {
        if (num === 0) {
            setWobble(1)
            setNum(headshots.length - 1)
            setUser({...user, avatar: headshots[num]})
            
        } else {
            setWobble(1)
            setNum(num -= 1)
            setUser({...user, avatar: headshots[num]})
        }
    }
    //console.log(user)
    return (
        <>
        <div className={styles.avatar}
                onAnimationEnd={() => setWobble(0)}
                wobble={wobble}>
            <button className={styles.arrow} onClick={() => goLeft(num)}>{`<`}</button> 
            <div 
                className={styles.innerAvatar}
                style={{backgroundImage: `url(/star_wars_characters/${headshots[num]})`}}></div> 
            <button className={styles.arrow} onClick={() => goRight(num)}>{`>`}</button>          
        </div>
        </>
    )
}

export default Cycle
