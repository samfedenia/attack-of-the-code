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
import { SocketContext } from './context/socket';
import { UserContext, USER_ACTIONS } from './context/user';
import { BackgroundContext } from './context/background';
import { ViewContext, VIEW_ACTIONS } from './context/view';

const LandingPage = () => {
  const [font, setFont] = useState('StarJedi');
  const [toggle, setToggle] = useState(false);
  const [wobble, setWobble] = useState(0);
  const [headshots, setHeadshots] = useState([]);
  const [num, setNum] = useState(0); // index for background array
  const [formState, setFormState] = useState({
    avatar: '',
    playerName: 'padawan',
    roomCode: '',
  });

  const { userDispatch } = useContext(UserContext);
  const { backgroundsState } = useContext(BackgroundContext);
  const { viewState, viewDispatch } = useContext(ViewContext);
  const socket = useContext(SocketContext);
  const getCharacters = async () => {
    const { data: images } = await axios.get('/api/headshots');
    return images;
  };

  useEffect(() => {
    getCharacters().then((images) => {
      setHeadshots(images);
    });
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
    const randomNum = Math.floor(Math.random() * backgroundsState.length);
    document.body.style.background = `url(/backgrounds/${backgroundsState[randomNum]}), linear-gradient(rgba(5, 8, 46, 0.712), rgba(53, 0, 0, 0.801))`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
    userDispatch({
      type: USER_ACTIONS.UPDATE_USER,
      payload: { background: backgroundsState[randomNum] },
    });

    const randomIndex = Math.floor(Math.random() * headshots.length);
    setNum(randomIndex);
    setFormState({
      ...formState,
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
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
    console.log(formState);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    viewState.loading = true;
    setTimeout(
      () =>
        viewDispatch({
          type: VIEW_ACTIONS.CHANGE_VIEW,
          payload: { loading: false },
        }),
      2000
    );
    socket.emit('join-room', formState.roomCode, formState.playerName);
    userDispatch({ type: USER_ACTIONS.UPDATE_USER, payload: formState });
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
      <Cycle headshots={headshots} num={num} setNum={setNum} />
      <form onSubmit={handleSubmit} autoComplete='off'>
        <Row className={styles.form}>
          <TextInput
            type='text'
            placeholder='Name'
            name='playerName'
            onChange={handleChange}
            value={formState.playerName}
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
            value={formState.roomCode}
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
            Join
          </Button>
        </Row>
      </form>
    </Container>
  );
};

export default LandingPage;
