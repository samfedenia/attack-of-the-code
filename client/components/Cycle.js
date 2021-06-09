import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext, USER_ACTIONS } from './context/user';
import styles from './css/Cycle.module.css';

const Cycle = ({ headshots, num, setNum }) => {
  const [wobble, setWobble] = useState(0);

  const { userState, userDispatch } = useContext(UserContext);

  const userObject = (num) => ({
    type: USER_ACTIONS.UPDATE_USER,
    payload: { avatar: headshots[num] },
  });

  const goRight = (num) => {
    if (num === headshots.length - 1) {
      setWobble(1);
      setNum(0);
      userDispatch(userObject(num));
    } else {
      setWobble(1);
      setNum((num += 1));
      userDispatch(userObject(num));
    }
  };

  const goLeft = (num) => {
    if (num === 0) {
      setWobble(1);
      setNum(headshots.length - 1);
      userDispatch(userObject(num));
    } else {
      setWobble(1);
      setNum((num -= 1));
      userDispatch(userObject(num));
    }
  };
  //console.log(user)
  return (
    <div>
      <div
        className={styles.avatar}
        onAnimationEnd={() => setWobble(0)}
        wobble={wobble}
      >
        <button
          className={styles.arrow}
          onClick={() => goLeft(num)}
        >{`<`}</button>
        <div
          className={styles.innerAvatar}
          style={{
            backgroundImage: `url(/star_wars_characters/${headshots[num]})`,
          }}
        ></div>
        <button
          className={styles.arrow}
          onClick={() => goRight(num)}
        >{`>`}</button>
      </div>
    </div>
  );
};

export default Cycle;
