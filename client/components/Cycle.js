import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext, USER_ACTIONS } from './context/user';
import styles from './css/Cycle.module.css';

const Cycle = ({ headshots, num, setNum, formState, setFormState }) => {
  const { avatar } = formState;
  const [wobble, setWobble] = useState(0);

  const { userState, userDispatch } = useContext(UserContext);

  const userObject = (num) => ({
    type: USER_ACTIONS.UPDATE_USER,
    payload: { avatar: headshots[num] },
  });

  const setAvatar = (num) => {
        setWobble(1)
        userDispatch(userObject(num));
        setFormState({...formState, avatar: headshots[num]})
  }

  const goRight = (num) => {
    if (num === headshots.length - 1) {
      setNum(0);
      setAvatar(num)
    } else {
      setNum((num += 1));
      setAvatar(num)
    }
  };

  const goLeft = (num) => {
    if (num === 0) {
      setNum(headshots.length - 1);
      setAvatar(num)
    } else {
      setNum((num -= 1));
      setAvatar(num)
    }
  };
  
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
