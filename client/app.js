import React, { useEffect, useContext } from 'react';
import LandingPage from './components/LandingPage';
import GameContainer from './components/GameContainer';
import { UserContext } from './components/context/user';
import Loading from './components/Loading';
import { ViewContext, VIEW_ACTIONS } from './components/context/view';

const App = () => {
  const userFromSessionStorage = JSON.parse(
    window.sessionStorage.getItem('user')
  );
  const { userState } = useContext(UserContext);
  const { viewState, viewDispatch } = useContext(ViewContext);

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
    <>
      {userState?.roomCode || userFromSessionStorage?.roomCode ? (
        <GameContainer />
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default App;
