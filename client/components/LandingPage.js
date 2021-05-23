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
  const [headshots, setHeadshots] = useState([]);
  const [num, setNum] = useState(0);
  const [user, setUser] = useState({username: 'test', avatar: ''});

  const getCharacters = async () => {
        const {data: images} = await axios.get('/api/headshots');
        return images
    };

  const getBackgrounds = async () => {
        const {data: backgrounds} = await axios.get('/api/backgrounds');
        return backgrounds
  };

  useEffect(() => {
    getCharacters()
      .then((images) => {
        setHeadshots(images)
      })

    getBackgrounds()
      .then((backgrounds) => {
        setBackgrounds(backgrounds)
      })

    }, [])

  const randomize = () => {
    setWobble(1)
    const randomNum = Math.floor(Math.random() * backgrounds.length); 
    document.body.style.backgroundImage= `url(/backgrounds/${backgrounds[randomNum]})` 

    const randomIndex = Math.floor(Math.random() * headshots.length);
    setNum(randomIndex)
    setUser({...user, avatar: headshots[randomIndex]})
  }

  // socket connection logic
  const socket = useContext(SocketContext);
  const newRoomCode = Math.random().toString(36).slice(-5);
  socket.emit('room', newRoomCode, 'anon');

  return (
    <Container className={styles.container}>
      <img className={styles.logo} src="/attackOfTheCodeLOGO.png" />
      <Row className={styles.cube}>
        <form className={styles.name}>
          <input type="text" placeholder="name" style={{ color: "white" }} />
        </form>
      </Row>
      <Row className={styles.cubeImg}>
        <img
          onClick={randomize}
          onAnimationEnd={() => setWobble(0)}
          wobble={wobble}
          src="/change_cube_transparent.png"
        />
        <Cycle 
          headshots={headshots}  
          user={user} 
          setUser={setUser}
          num={num}
          setNum={setNum}
          />
      </Row>
      <TextInput
        id="TextInput-4"
        placeholder="Room Code"
        style={{ color: "white" }}
      />
      <Button
        style={{ color: "black", backgroundColor: "rgb(245, 245, 12)" }}
        className="col l2 offset-l1 offset-s4 s4"
        node="button"
        waves="red"
      >
        Join
      </Button>
      <select className={styles.selectLanguage}>
        <option>Language</option>
        <option>English</option>
        <option>Aurebesh</option>
      </select>
    </Container>
  );
};

export default LandingPage;
