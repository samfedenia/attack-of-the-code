import React, { useState, useEffect, useContext } from "react";
import "materialize-css";
import styles from "./css/Game.module.css";
import editorStyles from "./css/Editor.module.css";
import Prompt from "./Prompt";
import CodePenClone from "./CodePenClone";
import GameSetup from "./GameSetup";
import Between from "./Between";
import { GameContext, GAME_ACTIONS } from "./context/game";
import { UserContext, USER_ACTIONS } from "./context/user";
import { SocketContext } from "./context/socket";

const Game = () => {
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [result, setResult] = useState("");
  const { gameState, gameDispatch } = useContext(GameContext);
  const { userState, userDispatch } = useContext(UserContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const { challenges, currentRound } = gameState;
    setJs(challenges[currentRound]?.start);
  }, [gameState]);

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
      userSubmissions,
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
        if (userSubmissions === 0) points = 10;
        else if (userSubmissions === 1) points = 7;
        else if (userSubmissions === 2) points = 5;

        // update gameState increment current submissions by 1
        gameDispatch({
          type: GAME_ACTIONS.SET_GAME,
          payload: { userSubmissions: gameState.userSubmissions + 1 },
        });

        const newGameState = {
          ...gameState,
          userSubmissions: gameState.userSubmissions + 1,
        };

        socket.emit("new-game-state", newGameState, userState.roomCode);
        window.sessionStorage.setItem(
          "gameStatus",
          JSON.stringify(newGameState)
        );

        // update user submitted status to true
        userDispatch({
          type: USER_ACTIONS.UPDATE_USER,
          payload: { submitted: true },
        });

        const newUserState = {
          ...userState,
          submitted: true,
          score: userState.score + points,
        };
        // emit user with our relevant score
        socket.emit("update-user", newUserState);
        window.sessionStorage.setItem("user", JSON.stringify(newUserState));

        userDispatch({
          type: USER_ACTIONS.UPDATE_USER,
          payload: { score: userState.score + points },
        });
        // alert(`Winner Winner Chicken Dinner`);
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
      {gameState.gameStatus === "setup" && <GameSetup />}
      {gameState.gameStatus === "playing" && (
        <div>
          <Prompt />
          <CodePenClone value={js} onChange={setJs} />
          <div className={editorStyles.runBtn}>
            <button onClick={runCode}>Run</button>
            <button onClick={checkCode}>Submit</button>
            <button onClick={resetCode}>Reset</button>
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
      )}
      {gameState.gameStatus === "between" && <Between />}
    </div>
  );
};

export default Game;
