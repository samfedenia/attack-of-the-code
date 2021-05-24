import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home';
import LandingPage from './components/LandingPage';
import GameContainer from './components/GameContainer';
import { UserContext } from "./components/context/user";

const App = () => {
  const user = useContext(UserContext);
  // const whatever = user.setUserContext
  // console.log('you are in the app')

  const roomCode = window.sessionStorage.getItem("roomCode");

  return (
    <>
      {
        user.roomCode || roomCode ? <GameContainer />
        : <LandingPage />
      }
    </>
  );
};

export default App;
