import React, { useEffect, useContext } from 'react';
import LandingPage from './components/LandingPage';
import GameContainer from './components/GameContainer';
import { UserContext, USER_ACTIONS } from './components/context/user';
import Loading from './components/Loading';
import { ViewContext, VIEW_ACTIONS } from './components/context/view';
import { SocketContext } from './components/context/socket';

const App = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const { viewState, viewDispatch } = useContext(ViewContext);
  const socket = useContext(SocketContext);

  const sessionID = sessionStorage.getItem('sessionID');
  if (sessionID) {
    socket.auth = { sessionID };
    socket.connect();
  }

  useEffect(() => {
    socket.on('session', (data) => {
      const { sessionID, userID, playerName, roomCode } = data;
      console.log(data);
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      userDispatch({
        type: USER_ACTIONS.UPDATE_USER,
        payload: { playerName, roomCode, userID },
      });

      // store it in the localStorage
      sessionStorage.setItem('sessionID', sessionID);
    });
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem('user', JSON.stringify(userState));
  }, [userState]);

  useEffect(() => {
    setTimeout(
      () =>
        viewDispatch({
          type: VIEW_ACTIONS.CHANGE_VIEW,
          payload: { loading: false },
        }),
      2000
    );
  }, []);

  return viewState.loading ? (
    <Loading />
  ) : (
    <>{userState?.roomCode ? <GameContainer /> : <LandingPage />}</>
  );
};

export default App;
