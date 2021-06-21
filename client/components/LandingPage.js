import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
// import 'materialize-css';
// import {
//   Container as MaterializeContainer,
//   Button,
//   TextInput,
//   Dropdown,
//   Divider,
//   Icon,
//   Card,
//   Row,
//   Col,
//   Select,
// } from 'react-materialize';
import Cycle from "./Cycle";
import styles from "./css/LandingPage.module.css";
import { SocketContext } from "./context/socket";
import { UserContext, USER_ACTIONS } from "./context/user";
import { BackgroundContext } from "./context/background";
import { ViewContext, VIEW_ACTIONS } from "./context/view";
import { namesList } from "../../public/namesList";

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
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
  const [font, setFont] = useState("StarJedi");
  const [toggle, setToggle] = useState(false);
  const [wobble, setWobble] = useState(0);
  const [headshots, setHeadshots] = useState([]);
  const [num, setNum] = useState(0); // index for background array
  const joinCode = window.location.pathname.split("/").slice(1);
  const [formState, setFormState] = useState({
    avatar: "star_wars_heads_0000_Layer-3.png",
    playerName: "padawan",
    roomCode:
      joinCode[0] === "join" && joinCode[1] !== undefined ? joinCode[1] : "",
  });

  const { userState, userDispatch } = useContext(UserContext);
  const { backgroundsState } = useContext(BackgroundContext);
  const { viewState, viewDispatch } = useContext(ViewContext);
  const socket = useContext(SocketContext);
  const getCharacters = async () => {
    const { data: images } = await axios.get("/api/headshots");
    return images;
  };

  useEffect(() => {
    if (joinCode[0] === "join" && joinCode[1] !== undefined) {
      navigator.clipboard.writeText(joinCode[1]);
    }
  }, []);

  useEffect(() => {
    checkExistingUserSession();
    getCharacters().then((images) => {
      setHeadshots(images);
    });
  }, []);

  const changeFont = () => {
    if (font === "StarJedi") {
      setFont("Aurebesh");
    } else {
      setFont("StarJedi");
    }
  };

  const randomize = () => {
    setWobble(1);
    const randomNum = Math.floor(Math.random() * backgroundsState.length);
    document.body.style.background = `url(/backgrounds/${backgroundsState[randomNum]}), linear-gradient(rgba(5, 8, 46, 0.712), rgba(53, 0, 0, 0.801))`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    userDispatch({
      type: USER_ACTIONS.UPDATE_USER,
      payload: { background: backgroundsState[randomNum] },
    });

    const randomIndex = Math.floor(Math.random() * headshots.length);
    setNum(randomIndex);
    setFormState({
      ...formState,
      avatar: headshots[randomIndex],
      playerName:
        namesList[Math.floor(Math.random() * namesList.length)].toLowerCase(),
      roomCode:
        joinCode[0] === "join" && joinCode[1] !== undefined
          ? joinCode[1]
          : createRoomCode(),
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

    const user = {
      ...userState,
      ...formState,
    };

    socket.emit("room", user);
    userDispatch({
      type: USER_ACTIONS.UPDATE_USER,
      payload: user,
    });
    window.location.replace(window.location.origin);
  }

  function checkExistingUserSession() {
    const formState = JSON.parse(window.sessionStorage.getItem("user"));
    if (formState) setFormState(formState);
  }

  return (
    <Container className={styles.container}>
      <img className={styles.logo} src="/attackOfTheCodeLOGO.png" />
      <Row className={styles.switch}>
        <div className="switch">
          <label
            style={{
              fontFamily: font,
              textShadow: "black 0px 0px 2px",
              color: "white",
              letterSpacing: ".1em",
            }}
          >
            English
            <input onClick={changeFont} type="checkbox" />
            <span className="lever"></span>
            Aurebesh
          </label>
        </div>
      </Row>
      <Row className={styles.cubeImg}>
        <img
          onClick={randomize}
          onAnimationEnd={() => setWobble(0)}
          wobble={wobble}
          src="/change_cube_transparent.png"
        />
      </Row>
      <Cycle
        headshots={headshots}
        num={num}
        setNum={setNum}
        formState={formState}
        setFormState={setFormState}
      />
      <form onSubmit={handleSubmit} autoComplete="off">
        <Row className={styles.form}>
          <FormControl
            type="text"
            placeholder="Name"
            name="playerName"
            onChange={handleChange}
            value={formState.playerName}
            style={{
              color: "white",
              fontFamily: font,
              textShadow: "black 0px 0px 2px",
              letterSpacing: ".1em",
            }}
          />

          <FormControl
            id="TextInput-4"
            placeholder="Room Code"
            name="roomCode"
            onChange={handleChange}
            value={formState.roomCode}
            style={{
              color: "white",
              fontFamily: font,
              textShadow: 'black 0px 0px 2px',
              letterSpacing: '.1em',
              backgroundColor: 'transparent'
            }}
            className="blue-border"
          />

          <Button
            style={{
              color: "black",
              backgroundColor: "#fff103",
              fontFamily: "Verdana",
              letterSpacing: ".1em",
              width: "10rem",
              borderStyle: "none",
            }}
            type="submit"
            node="button"
            waves="red"
          >
            Join
          </Button>
        </Row>
      </form>
    </Container>
  );
};

export default LandingPage;
