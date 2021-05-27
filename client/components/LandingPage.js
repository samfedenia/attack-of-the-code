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
import { BackgroundContext } from './context/background';

const LandingPage = ({view, setView}) => {
  const [font, setFont] = useState('StarJedi');
  const [toggle, setToggle] = useState(false);
  const [wobble, setWobble] = useState(0);
  //const [backgrounds, setBackgrounds] = useState([]);
  const [headshots, setHeadshots] = useState([]);
  const [num, setNum] = useState(0);
  const [user, setUser] = useState({
    avatar: '',
    playerName: '',
    roomCode: '',
  });

  const [userContext, setUserContext] = useContext(UserContext);
  const [backgrounds, setBackgrounds] = useContext(BackgroundContext);
  const socket = useContext(SocketContext);
  const getCharacters = async () => {
    const { data: images } = await axios.get('/api/headshots');
    return images;
  };

  // const getBackgrounds = async () => {
  //   const { data: backgrounds } = await axios.get('/api/backgrounds');
  //   return backgrounds;
  // };

  useEffect(() => {
    getCharacters().then((images) => {
      setHeadshots(images);
    });

    // getBackgrounds().then((backgrounds) => {
    //   setBackgrounds(backgrounds);
    // });
  }, []);

  useEffect(() => {
    checkExistingUserSession();
  }, []);

  const changeFont = () => {
    if (font === 'StarJedi') {
      setFont('Aurebesh');
    } else {
      setFont('StarJedi');
    }
  };

  const randomize = () => {
    setWobble(1);
    const randomNum = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = `url(/backgrounds/${backgrounds[randomNum]}), linear-gradient(rgba(5, 8, 46, 0.712), rgba(53, 0, 0, 0.801))`;

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
    const value = evt.target.value.toLowerCase();
    setUser({
      ...user,
      [evt.target.name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    view.loading = true;
    setTimeout(() => setView({ loading: false }), 2000);
    window.sessionStorage.setItem('roomCode', user.roomCode);
    window.sessionStorage.setItem('playerName', user.playerName);
    window.sessionStorage.setItem(
      'user',
      JSON.stringify({
        playerName: user.playerName,
        roomCode: user.roomCode,
        avatar: user.avatar,
      })
    );
    socket.emit('room', user.roomCode, user.playerName);
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
              fontFamily: font,
              textShadow: 'black 0px 0px 2px',
              color: 'white',
              letterSpacing: '.1em',
            }}
          >
            English
            <input onClick={changeFont} type='checkbox' />
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
      <form onSubmit={handleSubmit} autoComplete='off'>
        <Row className={styles.form}>
          <TextInput
            type='text'
            placeholder='Name'
            name='playerName'
            onChange={handleChange}
            value={user.playerName}
            style={{
              color: 'white',
              fontFamily: font,
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
              fontFamily: font,
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
            type='submit'
            node='button'
            waves='red'
          >
            JOIN
          </Button>
        </Row>
      </form>
    </Container>
  );
};

export default LandingPage;
