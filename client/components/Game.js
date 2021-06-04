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
import styles from './css/Game.module.css';
import { SocketContext } from './context/socket';
import Prompt from './Prompt';
import CodePenClone from './CodePenClone';
import NewCodePenClone from './NewCodePenClone';
import GameSetup from './GameSetup';
import { GameContext } from './context/game';

const Game = () => {
  // // socket connection logic
  // const socket = useContext(SocketContext);
  // const newRoomCode = Math.random().toString(36).slice(-5);
  // socket.emit("room", newRoomCode, "anon");
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');
  const [result, setResult] = useState('');
  const [gameState, setGameState] = useContext(GameContext);
  const runCode = () => {
    // console.log(js)
    setResult(eval(js));
    setSrcDoc(`
            <html>
              <style>
                * {
                  font-family: Verdana;
                }
              </style>
                <body>
                    <div id="result"></div>
                </body>
                <script>
                    const result = document.getElementById('result');
                    result.innerText = '${eval(js)}'
                </script>
            </html>
        `);
  };

  const checkCode = () => {
    if (result === 2) {
      alert('The answer was 2 you are correct');
    } else {
      alert('incorrect');
    }
  };

  //console.log('result', result)

  useEffect(async () => {
    console.log(await axios.get('/api/gamedata/demo'));
    console.log('Game state', gameState);
  }, []);

  return (
    <div className={styles.game}>
      <GameSetup />
      <div></div>
      <Prompt />
      <CodePenClone value={js} onChange={setJs} />
      <div className="run-btn">
        <button onClick={runCode}>Run</button>
        <button onClick={checkCode}>Submit</button>
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Game;
