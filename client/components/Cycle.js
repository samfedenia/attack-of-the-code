import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './css/Cycle.module.css';

const Cycle = () => {
    const [wobble, setWobble] = useState(0)
    const [headshots, setHeadshots] = useState([]);
    const [num, setNum] = useState(0)
    const [user, setUser] = useState({
        username: 'test',
        avatar: ''
    });

    const getImages = async () => {
        const {data: images} = await axios.get('/api/headshots');
        return images
    };

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

    useEffect(() => {
        getImages()
            .then((images) => {
                setHeadshots(images)
            })
    }, [])

    // console.log(headshots)
    // console.log(user)
    return (
        <>
        {/* <form className={styles.name}>
        <input type='text' placeholder='name' />
        </form> */}
        <div className={styles.avatar}
                onAnimationEnd={() => setWobble(0)}
                wobble={wobble}>
            <button className={styles.arrow} onClick={() => goLeft(num)}>{`<`}</button> 
            <div 
                className={styles.innerAvatar}
                style={{backgroundImage: `url(/star_wars_characters/${headshots[num]})`}}></div> 
            {/* <img 
                onClick={() => setWobble(1)}
                onAnimationEnd={() => setWobble(0)}
                wobble={wobble}
                src={headshots.length > 0 ? `/star_wars_characters/${headshots[num]}` : null} 
                
            /> */}
            <button className={styles.arrow} onClick={() => goRight(num)}>{`>`}</button>          
        </div>
        </>
    )
}

export default Cycle
