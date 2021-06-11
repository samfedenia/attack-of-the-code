import React, { useState, useEffect, useContext } from "react";
import "materialize-css";
import styles from "./css/Game.module.css";
import editorStyles from "./css/Editor.module.css";
import Prompt from "./Prompt";
import CodePenClone from "./CodePenClone";
import GameSetup from "./GameSetup";
import { GameContext, GAME_ACTIONS } from "./context/game";

const Game = () => {
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [result, setResult] = useState("");
  const { gameState, gameDispatch } = useContext(GameContext);

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
    } = gameState;
    /**
   * {
    prompt: "Create a function (add) that adds two numbers",
    start: "const add (num1, num2) => {\n\n}",
    testCall1: "add(2, 3)",
    testResult1: "5",
    testCall2: "add(3, 4)",
    testResult2: "7",
  }
   */
    let answer1 = eval(js + `\n${challenges[currentRound].testCall1}`);
    let answer2 = eval(js + `\n${challenges[currentRound].testCall2}`);

    // setResult(eval(js + '\ntest()'));
    if (
      answer1 === challenges[currentRound].testResult1 &&
      answer2 === challenges[currentRound].testResult2
    ) {
      alert(`Winner Winner Chicken Dinner`);
    } else {
      alert("incorrect");
    }
  };

  const resetCode = () => {
    setJs("");
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

  //console.log('result', result)

  useEffect(() => {
    // console.log(await axios.get('/api/gamedata/demo'));
    console.log("Game state", gameState);
  }, []);

  return (
    <div className={styles.game}>
      {gameState.gameStatus === "setup" ? (
        <GameSetup />
      ) : (
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
    </div>
  );
};

export default Game;
