import React, { useContext, useEffect, useState } from 'react';
import { GameContext, GAME_ACTIONS } from './context/game';
import { UserContext, USER_ACTIONS } from './context/user';
import { SocketContext } from './context/socket';

function GameStateHandler({ submissionState, setSubmissionState }) {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { userState, userDispatch } = useContext(UserContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (submissionState === 3) {
      gameDispatch({
        type: GAME_ACTIONS.SET_GAME,
        payload: {
          ...gameState,
          gameStatus: 'between',
          roundComplete: true,
        },
      });
      socket.emit(
        'new-game-state',
        {
          ...gameState,
          gameStatus: 'between',
        },
        userState.roomCode
      );
    }
    socket.on('answer-total-update', () => {
      setSubmissionState(submissionState + 1);
    });
    return () => {
      socket.off('answer-total-update');
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
      roundComplete,
    } = gameState;

    if (userState.submitted === true) {
      // || submissionState === 3
      if (gameStatus !== 'between') {
        gameDispatch({
          type: GAME_ACTIONS.SET_GAME,
          payload: {
            ...gameState,
            gameStatus: 'between',
            // roundComplete: true,
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
          gameStatus: 'gameover',
          currentRound: 0,
        },
      });
    }
  }, [gameState, userState]);

  return <></>;
}

export default GameStateHandler;
