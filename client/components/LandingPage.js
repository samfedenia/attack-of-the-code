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
import { UserContext } from '../components/context/user';

const LandingPage = () => {
  const [wobble, setWobble] = useState(0);
  const [backgrounds, setBackgrounds] = useState([]);
  const [headshots, setHeadshots] = useState([]);
  const [num, setNum] = useState(0);
  const [user, setUser] = useState({
    avatar: '',
    playerName: '',
    roomCode: '',
    socket: useContext(SocketContext),
  });

  const [userContext, setUserContext] = useContext(UserContext);

  const getCharacters = async () => {
    const { data: images } = await axios.get('/api/headshots');
    return images;
  };

  const getBackgrounds = async () => {
    const { data: backgrounds } = await axios.get('/api/backgrounds');
    return backgrounds;
  };

  useEffect(() => {
    getCharacters().then((images) => {
      setHeadshots(images);
    });

    getBackgrounds().then((backgrounds) => {
      setBackgrounds(backgrounds);
    });
  }, []);

  useEffect(() => {
    checkExistingUserSession();
  }, []);

  const randomize = () => {
    setWobble(1);
    const randomNum = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = `url(/backgrounds/${backgrounds[randomNum]})`;

    const randomIndex = Math.floor(Math.random() * headshots.length);
    setNum(randomIndex);
    setUser({
      ...user,
      avatar: headshots[randomIndex],
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
    setUserContext(user);
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
          onClick={randomize}
          onAnimationEnd={() => setWobble(0)}
          wobble={wobble}
          src='/change_cube_transparent.png'
        />
      </Row>
      <Cycle
        headshots={headshots}
        user={user}
        setUser={setUser}
        num={num}
        setNum={setNum}
      />
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
