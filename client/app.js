import React, { useState, useEffect, useContext } from 'react';
import LandingPage from './components/LandingPage';
import GameContainer from './components/GameContainer';
import { CombinedContextProvider } from './components/context';
import { UserContext } from './components/context/user';
import Loading from './components/Loading';
import { ViewContext, VIEW_ACTIONS } from './components/context/view';

const App = () => {
  const userFromSessionStorage = JSON.parse(
    window.sessionStorage.getItem('user')
  );
  const { userState } = useContext(UserContext);
  const { viewState, viewDispatch } = useContext(ViewContext);
  const [gameState, setGameState] = useState({
    timeLimit: 90,
    gameStatus: 'setup', //playing, between, gameover
    level: 'demo',
    round: 1,
  });

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
    <CombinedContextProvider gameProfs={[gameState, setGameState]}>
      {userState?.roomCode || userFromSessionStorage?.roomCode ? (
        <GameContainer />
      ) : (
        <LandingPage />
      )}
    </CombinedContextProvider>
  );
};

export default App;
