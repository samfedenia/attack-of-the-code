import React, { useContext, useEffect, useState } from 'react';
import { quotesp } from '../quotes';
import styles from './css/Game.module.css';
import changeCubeStyles from './css/LandingPage.module.css';
import { GameContext, GAME_ACTIONS } from './context/game';
import { UserContext, USER_ACTIONS } from './context/user';
import { SocketContext } from './context/socket';
// import { Container, Row, Button } from 'react-materialize';
import MiniGame from './MiniGame';

import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Alert,
  Breadcrumb,
  Card,
  Form,
  Dropdown,
  DropdownButton,
  Nav,
  Navbar,
  NavDropdown,
  FormControl,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Between = ({ submissionState, setSubmissionState }) => {
  const randomize = () => Math.floor(Math.random() * quotesp.length);

  const [idx, setIdx] = useState(randomize());
  const [wobble, setWobble] = useState(0);
  const socket = useContext(SocketContext);
  const { gameState, gameDispatch } = useContext(GameContext);
  const { userState } = useContext(UserContext);
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (submissionState !== 0) {
      setSubmissionState(0);
    }
  }, [submissionState]);

  const setGame = () => {
    const newGameState = {
      ...gameState,
      gameStatus: 'playing',
      currentRound: gameState.currentRound + 1,
      roundComplete: false,
    };
    gameDispatch({ type: GAME_ACTIONS.SET_GAME, payload: newGameState });
    socket.emit('new-game-state', newGameState, userState.roomCode);
  };

  // useEffect(() => {
  //   if (gameState.roundComplete) countDown();
  // }, [gameState.roundComplete]);

  // const countDown = () => {
  //   const countingDown = setInterval(() => {
  //     setCount(count - 1);
  //     if (count === 0) {
  //       clearInterval(countingDown);
  //       setGame();
  //     }
  //   }, 1000);
  // };

  return (
    <Container className={styles.container}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
        <Row hidden={gameState.roundComplete}>
          {/* <h3>Next Round Starting in {count}</h3> */}
          <Button
            onClick={setGame}
            style={{ backgroundColor: '#00e7e7', color: 'black' }}
          >
            Next
          </Button>
        </Row>
        <Row>{/* <MiniGame /> */}</Row>
      </div>
    </Container>
  );
};

export default Between;
