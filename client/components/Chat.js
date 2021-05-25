// import axios from 'axios';
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
  Chip,
} from 'react-materialize';
import Cycle from './Cycle';
import styles from './css/Game.module.css';
import { SocketContext } from '../components/context/socket';
import { UserContext } from '../components/context/user';

const Chat = () => {
  // get socketContext
  const socket = useContext(SocketContext);
  // get user context
  const [userContext, setUserContext] = useContext(UserContext);
  const [user, setUser] = useState(userContext);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState({});

  // const handleTabClose = (e) => {
  //   e.preventDefault();
  //   socket.emit('leave-room', userContext.roomCode, userContext.playerName);
  // };

  useEffect(() => {
    window.onbeforeunload = (event) => {
      const e = event || window.event;
      e.preventDefault();
      alert('some stuff');
      socket.emit('leave-room', userContext.roomCode, userContext.playerName);
      if (e) {
        e.returnValue = '';
      }
      return '';
    };
  }, []);

  useEffect(() => {
    if (!userContext.playerName) {
      const userFromSessionStorage = JSON.parse(
        window.sessionStorage.getItem('user')
      );
      socket.emit(
        'room',
        userFromSessionStorage.roomCode,
        userFromSessionStorage.playerName
      );
      setUserContext({ ...userFromSessionStorage, socket: socket });
      setUser({ ...userFromSessionStorage, socket: socket });
    }
  }, [userContext]);

  useEffect(() => {
    if (userContext.socket) {
      userContext.socket.on('user-joined', ({ user }) => {
        setIncomingMessage({ user, message: 'joined' });
      });
      userContext.socket.on('chat-message', ({ playerName, message }) => {
        setIncomingMessage({ user: playerName, message: message });
      });
      userContext.socket.on('user-left', ({ user }) => {
        setIncomingMessage({ user, message: 'left!' });
      });
    }
    return () => {
      // userContext.socket.off('user-joined');
      userContext.socket.off('chat-message');
      // userContext.socket.off('user-left');
    };
  }, []);

  function handleIncomingMessage(incomingMessage) {
    setChatMessages([incomingMessage, ...chatMessages]);
    setIncomingMessage({});
  }

  if (incomingMessage.message) {
    console.log('handling incoming message', incomingMessage);
    handleIncomingMessage(incomingMessage);
  }

  function handleClickCopyRoomCode(evt) {
    evt.preventDefault();
    const clipboardToast = styles.clipboardToast;
    window.M.toast({
      html: 'Copied to clipboard!',
      displayLength: 1000,
      classes: clipboardToast,
    });
    navigator.clipboard.writeText(userContext.roomCode);
  }
  function handleChange(evt) {
    evt.preventDefault();
    setMessageInput(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // setChatMessages([
    //   { user: userContext.playerName, message: messageInput },
    //   ...chatMessages,
    // ]);
    userContext.socket.emit(
      'chat-message',
      userContext.playerName,
      userContext.roomCode,
      messageInput
    );
    setMessageInput('');
  }

  return (
    <Container className={styles.chat}>
      <Col>
        <Row>
          <h1>chat</h1>
        </Row>
        <Row>
          <Chip onClick={handleClickCopyRoomCode}>
            <i className='tiny material-icons'>content_copy</i>
            <span>{'  '}</span>
            Room: {userContext.roomCode}
          </Chip>
          <Chip>Player: {userContext.playerName}</Chip>
        </Row>

        <Row>
          <div id='chat-window' className={styles.messageContainer}>
            {chatMessages.map((msg, idx) => {
              return (
                <Card
                  key={idx}
                  className={styles.messageCard}
                  style={{
                    backgroundColor:
                      msg.user === userContext.playerName
                        ? 'rgb(55,132,214)'
                        : 'lightgray',
                    color:
                      msg.user === userContext.playerName
                        ? 'whitesmoke'
                        : 'black',
                  }}
                >
                  {msg.user}: {msg.message}
                </Card>
              );
            })}
          </div>
        </Row>
        <Row>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <TextInput
              style={{ color: 'white' }}
              type='text'
              onChange={handleChange}
              value={messageInput}
              placeholder='Say something!'
            ></TextInput>
            <Button
              type='submit'
              style={{
                color: 'black',
                backgroundColor: '#fff103',
                fontFamily: 'Verdana',
                letterSpacing: '.1em',
                width: '100%',
              }}
            >
              Send
            </Button>
          </form>
        </Row>
      </Col>
    </Container>
  );
};

export default Chat;
