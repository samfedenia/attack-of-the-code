import React, { useContext, useEffect, useState } from 'react';
import { quotesp } from '../quotes';
import styles from './css/Game.module.css';
import changeCubeStyles from './css/LandingPage.module.css';
import { GameContext, GAME_ACTIONS } from './context/game';
import { UserContext, USER_ACTIONS } from './context/user';
import { SocketContext } from './context/socket';
import { Container, Row } from 'react-materialize';

const Between = () => {
  const randomize = () => Math.floor(Math.random() * quotesp.length);

  const [idx, setIdx] = useState(randomize());
  const [wobble, setWobble] = useState(0);

  return (
    <Container className={styles.container}>
      <div>
        <div className={styles.profQuotes}>
          <br />"{quotesp[idx]}"<br /> <span>-Prof</span>
        </div>
        <Row className={changeCubeStyles.cubeImg}>
          <img
            src="/change_cube_transparent.png"
            wobble={wobble}
            onAnimationEnd={() => setWobble(0)}
            onClick={() => {
              setIdx(randomize());
              setWobble(1);
            }}
          />
        </Row>
      </div>
    </Container>
  );
};

export default Between;
