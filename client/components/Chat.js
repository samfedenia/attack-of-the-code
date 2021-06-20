// import axios from 'axios';
import React, { useState, useEffect, useContext, useRef } from 'react';
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
import Picker from 'emoji-picker-react';
import styles from './css/Game.module.css';
import { SocketContext } from './context/socket';
import { UserContext } from './context/user';
import { ChatContext, CHAT_ACTIONS } from './context/chat';

const Chat = () => {
  const socket = useContext(SocketContext);
  const { userState } = useContext(UserContext);
  const { chatState, chatDispatch } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const ref = useRef(null);

  const emojiPickerStyles = {
    position: 'absolute',
    backgroundColor: 'white',
    borderTop: 'none',
    width: '100%',
    height: '35%',
    right: '60px',
    bottom: '150px',
    zIndex: '999',
  };

  useEffect(() => {
    function handleCloseEmojiPicker(evt) {
      evt = evt || window.event;
      var isEscape = false;
      if ('key' in evt) {
        isEscape = evt.key === 'Escape' || evt.key === 'Esc';
      } else {
        isEscape = evt.keyCode === 27;
      }
      if (isEscape) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener('keydown', handleCloseEmojiPicker);
    return () => {
      document.removeEventListener('keydown', handleCloseEmojiPicker);
    };
  }, []);

  const onShowEmojiClick = (evt) => {
    evt.preventDefault();
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onEmojiClick = (evt, emojiObject) => {
    evt.preventDefault();
    const cursor = ref.current.selectionStart;
    const text =
      messageInput.slice(0, cursor) +
      emojiObject.emoji +
      messageInput.slice(cursor);
    setMessageInput(text);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    setMessages(chatState);
  }, [chatState]);

  useEffect(() => {
    socket.on('user-joined', ({ playerName }) => {
      chatDispatch({
        type: CHAT_ACTIONS.USER_JOINED,
        payload: { playerName, message: 'joined' },
      });
    });
    socket.on('chat-message', ({ playerName, message, socketId }) => {
      chatDispatch({
        type: CHAT_ACTIONS.CHAT_MESSAGE,
        payload: { playerName, message, socketId },
      });
    });
    socket.on('user-left', ({ playerName }) => {
      chatDispatch({
        type: CHAT_ACTIONS.USER_LEFT,
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
    const joinUrl = window.location.origin + '/join/' + userState.roomCode;
    navigator.clipboard.writeText(joinUrl);
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

  function handleClickLogout(evt) {
    evt.preventDefault();
    window.sessionStorage.clear();
    window.location.reload();
  }

  return (
    <Container className={styles.chat}>
      <Col>
        <div className={styles.chatInfo}>
          <Row>
            <Chip onClick={handleClickCopyRoomCode} className={styles.chip}>
              <i className='tiny material-icons'>content_copy</i>
              <span>{'  '}</span>
              Room: {userState.roomCode}
            </Chip>
            <Chip onClick={handleClickLogout} className={styles.chip}>
              <i className='tiny material-icons'>logout</i>
              <span>{'  '}</span>
              Leave Game
            </Chip>
          </Row>
        </div>
        <Row>
          <div id='chat-window' className={styles.messageContainer}>
            {messages.map((msg, idx) => {
              return (
                <Card
                  key={idx}
                  className={styles.messageCard}
                  style={{
                    backgroundColor:
                      msg.socketId === socket.id
                        ? 'rgb(55,132,214)'
                        : 'lightgray',
                    color: msg.socketId === socket.id ? 'whitesmoke' : 'black',
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
          <form onSubmit={handleSubmit} autoComplete='off'>
            <TextInput
              style={{ color: 'white', overflowWrap: 'break-word' }}
              ref={ref}
              type='text'
              onChange={handleChange}
              value={messageInput}
              placeholder='Say something!'
              maxLength='100'
            >
              <span onClick={onShowEmojiClick} style={{ fontSize: '2rem' }}>
                ☺️
              </span>
            </TextInput>

            <Button
              disabled={!messageInput}
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
          {showEmojiPicker && (
            <Picker
              onEmojiClick={onEmojiClick}
              groupVisibility={{
                flags: false,
              }}
              disableSearchBar={true}
              disableSkinTonePicker={true}
              pickerStyle={emojiPickerStyles}
            />
          )}
        </Row>
      </Col>
    </Container>
  );
};

export default Chat;
