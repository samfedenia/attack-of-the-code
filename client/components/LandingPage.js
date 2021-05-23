import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import 'materialize-css';
import {
  Container,
  Button,
  TextInput,
  Dropdown,
  Divider,
  Icon,
  Card,
  Row,
  Col,
  Select,
} from 'react-materialize';
import Cycle from './Cycle';
import styles from './css/LandingPage.module.css';
import { SocketContext } from '../components/context/socket';

const LandingPage = () => {
  const [wobble, setWobble] = useState(0);
  const [backgrounds, setBackgrounds] = useState([]);
  const [user, setUser] = useState({
    playerName: '',
    roomCode: '',
    socket: useContext(SocketContext),
  });

  const getBackgrounds = async () => {
    const { data: backgrounds } = await axios.get('/api/backgrounds');
    return backgrounds;
  };

  useEffect(() => {
    checkExistingUserSession();
    getBackgrounds().then((backgrounds) => {
      setBackgrounds(backgrounds);
    });
  }, []);

  const changeBg = () => {
    setWobble(1);
    const randomNum = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = `url(/backgrounds/${backgrounds[randomNum]})`;
    setUser({
      ...user,
      playerName: 'Anon',
      roomCode: createRoomCode(),
    });
  };

  const createRoomCode = () => {
    return Math.random().toString(36).slice(-5);
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setUser({
      ...user,
      [evt.target.name]: value,
    });
  }

  function handleClickJoin(evt) {
    evt.preventDefault();
    window.sessionStorage.setItem('roomCode', user.roomCode);
    window.sessionStorage.setItem('playerName', user.playerName);
    user.socket.emit('room', user.roomCode, user.playerName);
  }

  function checkExistingUserSession() {
    const roomCode = window.sessionStorage.getItem('roomCode');
    const playerName = window.sessionStorage.getItem('playerName');
    if (playerName && roomCode)
      setUser({ ...user, playerName: playerName, roomCode: roomCode });
  }

  return (
    <Container className={styles.container}>
      {/* <Row className={styles.innerContainer} style={{backgroundImage: `url(/attackOfTheCodeLOGO.png)`}}>
            </Row> */}
      <img className={styles.logo} src='/attackOfTheCodeLOGO.png' />
      <Row className={styles.switch}>
        <div className='switch'>
          <label
            style={{
              fontFamily: 'StarJedi',
              textShadow: 'black 0px 0px 2px',
              color: 'white',
              letterSpacing: '.1em',
            }}
          >
            English
            <input type='checkbox' />
            <span className='lever'></span>
            Aurebesh
          </label>
        </div>
      </Row>
      <Row className={styles.cubeImg}>
        <img
          onClick={changeBg}
          onAnimationEnd={() => setWobble(0)}
          wobble={wobble}
          src='/change_cube_transparent.png'
        />
      </Row>
      <Cycle />
      <Row className={styles.form}>
        <TextInput
          type='text'
          placeholder='Name'
          name='playerName'
          onChange={handleChange}
          value={user.playerName}
          style={{
            color: 'white',
            fontFamily: 'StarJedi',
            textShadow: 'black 0px 0px 2px',
            letterSpacing: '.1em',
          }}
        />

        <TextInput
          id='TextInput-4'
          placeholder='Room Code'
          name='roomCode'
          onChange={handleChange}
          value={user.roomCode}
          style={{
            color: 'white',
            fontFamily: 'StarJedi',
            textShadow: 'black 0px 0px 2px',
            letterSpacing: '.1em',
          }}
          className='blue-border'
        />
        <Button
          style={{
            color: 'black',
            backgroundColor: '#fff103',
            fontFamily: 'Verdana',
            letterSpacing: '.1em',
            width: '10rem',
          }}
          onClick={handleClickJoin}
          node='button'
          waves='red'
        >
          JOIN
        </Button>
      </Row>
    </Container>
  );
};

export default LandingPage;
