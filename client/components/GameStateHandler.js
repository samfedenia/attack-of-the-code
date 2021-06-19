import React, { useContext, useEffect, useState } from "react";
import { GameContext, GAME_ACTIONS } from "./context/game";
import { UserContext, USER_ACTIONS } from "./context/user";
import { SocketContext } from "./context/socket";

function GameStateHandler() {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { userState, userDispatch } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const [submissionState, setSubmissionState] = useState(0);

  useEffect(() => {
    if (submissionState === 3) {
      gameDispatch({
        type: GAME_ACTIONS.SET_GAME,
        payload: {
          ...gameState,
          gameStatus: "between",
        },
      });
      socket.emit(
        "new-game-state",
        {
          ...gameState,
          gameStatus: "between",
        },
        userState.roomCode
      );
      window.sessionStorage.setItem("gameStatus", JSON.stringify(gameState));
    }

    socket.on("answer-total-update", () => {
      setSubmissionState(submissionState + 1);
      console.log(submissionState);
    });

    return () => {
      socket.off("answer-total-update");
    };
  }, [submissionState]);

  useEffect(() => {
    const {
      timeLimit,
      gameStatus, //setup, playing, between, gameover
      level,
      totalRounds,
      challenges,
      currentRound,
      userSubmissions,
    } = gameState;

    if (userState.submitted === true) {
      if (gameStatus !== "between") {
        gameDispatch({
          type: GAME_ACTIONS.SET_GAME,
          payload: {
            ...gameState,
            gameStatus: "between",
            userSubmissions: 0,
          },
        });
        userDispatch({
          type: USER_ACTIONS.UPDATE_USER,
          payload: {
            ...userState,
            submitted: false,
          },
        });
      }
    } else if (userSubmissions === 3) {
      if (gameStatus !== "between") {
        gameDispatch({
          type: GAME_ACTIONS.SET_GAME,
          payload: {
            ...gameState,
            gameStatus: "between",
            userSubmissions: 0,
          },
        });
        userDispatch({
          type: USER_ACTIONS.UPDATE_USER,
          payload: {
            ...userState,
            submitted: false,
          },
        });
      }
    } else if (currentRound === totalRounds) {
      gameDispatch({
        type: GAME_ACTIONS.SET_GAME,
        payload: {
          ...gameState,
          gameStatus: "gameover",
          totalRounds: 0,
        },
      });
    }
  }, [gameState]);

  return <></>;
}

export default GameStateHandler;
