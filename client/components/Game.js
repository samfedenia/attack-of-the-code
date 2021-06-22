import React, { useState, useEffect, useContext } from "react";
import "materialize-css";
import styles from "./css/Game.module.css";
import editorStyles from "./css/Editor.module.css";
import Prompt from "./Prompt";
import CodePenClone from "./CodePenClone";
import { GameContext, GAME_ACTIONS } from "./context/game";
import { UserContext, USER_ACTIONS } from "./context/user";
import { SocketContext } from "./context/socket";


import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Game = ({ submissionState, setSubmissionState }) => {
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [result, setResult] = useState("");
  const { gameState, gameDispatch } = useContext(GameContext);
  const { userState, userDispatch } = useContext(UserContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const { challenges, currentRound } = gameState;
    setJs(challenges[currentRound]?.start);
  }, [gameState.challenges]);

  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const all = document.querySelectorAll("*");
    if (user?.font === "Aurebesh") {
      [...all].map((el) =>
        el.style.setProperty("font-family", user.font, "important")
      );
    }
  }, []);

  const runCode = () => {
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
    const {
      timeLimit,
      gameStatus, //setup, playing, between, gameover
      level,
      totalRounds,
      challenges,
      currentRound,
    } = gameState;
    try {
      let answer1 = eval(js + `\n${challenges[currentRound].testCall1}`);
      let answer2 = eval(js + `\n${challenges[currentRound].testCall2}`);

      if (
        answer1 === challenges[currentRound].testResult1 &&
        answer2 === challenges[currentRound].testResult2
      ) {
        // look at gameState to determine how many current submissions to determine how many points to get 10, 7, 5
        let points = 0;
        if (submissionState === 0) points = 10;
        else if (submissionState === 1) points = 7;
        else if (submissionState === 2) points = 5;

        socket.emit("answer-submission", userState.roomCode);

        const newUserState = {
          ...userState,
          submitted: true,
          score: userState.score + points,
        };
        // emit user with our relevant score
        socket.emit("update-user", newUserState);

        userDispatch({
          type: USER_ACTIONS.UPDATE_USER,
          payload: newUserState,
        });
      } else {
        alert("incorrect");
      }
    } catch (error) {
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
                      result.innerText = '${error}'
                  </script>
              </html>
          `);
    }
  };

  const resetCode = () => {
    const { challenges, currentRound } = gameState;
    setJs(challenges[currentRound]?.start);
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
                    result.innerText = ''
                </script>
            </html>
        `);
  };

  return (
    <div className={styles.game}>
      <div>
        <Prompt />
        <CodePenClone value={js} onChange={setJs} />
        <div className={editorStyles.runBtn}>
          <Button className={editorStyles.editorBtn} onClick={runCode}>Run</Button>
          <Button className={editorStyles.editorBtn} onClick={checkCode}>Submit</Button>
          <Button className={editorStyles.editorBtn} onClick={resetCode}>Reset</Button>
        </div>
        <div className={editorStyles.pane}>
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
    </div>
  );
};

export default Game;
