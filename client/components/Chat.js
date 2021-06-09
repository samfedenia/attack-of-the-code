// import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import 'materialize-css';
import {
  Container,
  Button,
  TextInput,
  Card,
  Row,
  Col,
  Chip,
} from 'react-materialize';
import styles from './css/Game.module.css';
import { SocketContext } from './context/socket';
import { UserContext, USER_ACTIONS } from './context/user';
import { ACTIONS, ChatContext } from './context/chat';

const Chat = () => {
  const socket = useContext(SocketContext);
  const { userState, userDispatch } = useContext(UserContext);
  const { state, dispatch } = useContext(ChatContext);
  const [messageInput, setMessageInput] = useState('');

  // change this once userContext provider properly set up
  useEffect(() => {
    if (!userState.playerName) {
      const userFromSessionStorage = JSON.parse(
        window.sessionStorage.getItem('user')
      );
      socket.emit(
        'room',
        userFromSessionStorage.roomCode,
        userFromSessionStorage.playerName
      );
      userDispatch({
        type: USER_ACTIONS.UPDATE_USER,
        payload: userFromSessionStorage,
      });
    }
  }, [userState]);

  useEffect(() => {
    socket.on('user-joined', ({ playerName }) => {
      dispatch({
        type: ACTIONS.USER_JOINED,
        payload: { playerName, message: 'joined' },
      });
    });
    socket.on('chat-message', ({ playerName, message }) => {
      dispatch({
        type: ACTIONS.CHAT_MESSAGE,
        payload: { playerName, message },
      });
    });
    socket.on('user-left', ({ playerName }) => {
      dispatch({
        type: ACTIONS.USER_LEFT,
        payload: { playerName, message: 'left' },
      });
    });

    return () => {
      socket.off('user-joined');
      socket.off('chat-message');
      socket.off('user-left');
    };
  }, []);

  function handleClickCopyRoomCode(evt) {
    evt.preventDefault();

    window.M.toast({
      html: 'Copied to clipboard!',
      displayLength: 1000,
      classes: styles.clipboardToast,
    });
    navigator.clipboard.writeText(userState.roomCode);
  }

  function handleChange(evt) {
    evt.preventDefault();
    setMessageInput(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    socket.emit(
      'chat-message',
      userState.roomCode,
      userState.playerName,
      messageInput
    );
    setMessageInput('');
  }

  return (
    <Container className={styles.chat}>
      <Col>
        <div className={styles.chatInfo}>
          {/* <Row>
            <h1>chat</h1>
          </Row> */}
          <Row>
            <Chip onClick={handleClickCopyRoomCode}>
              <i className="tiny material-icons">content_copy</i>
              <span>{'  '}</span>
              Room: {userState.roomCode}
            </Chip>
            <Chip>Player: {userState.playerName}</Chip>
          </Row>
        </div>
        <Row>
          <div id="chat-window" className={styles.messageContainer}>
            {state.map((msg, idx) => {
              return (
                <Card
                  key={idx}
                  className={styles.messageCard}
                  style={{
                    backgroundColor:
                      msg.playerName === userState.playerName
                        ? 'rgb(55,132,214)'
                        : 'lightgray',
                    color:
                      msg.playerName === userState.playerName
                        ? 'whitesmoke'
                        : 'black',
                  }}
                >
                  <div className={styles.chatMessageContent}>
                    <strong>{msg.playerName}:</strong> {msg.message}
                  </div>
                </Card>
              );
            })}
          </div>
        </Row>
        <Row>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextInput
              style={{ color: 'white', overflowWrap: 'break-word' }}
              type="text"
              onChange={handleChange}
              value={messageInput}
              placeholder="Say something!"
              maxLength="100"
            ></TextInput>
            <Button
              type="submit"
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
