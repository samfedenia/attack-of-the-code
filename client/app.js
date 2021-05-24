import React, { useState } from 'react';
// import { Route } from 'react-router-dom';
import Home from './components/home';
import LandingPage from './components/LandingPage';
import GameContainer from './components/GameContainer';
import { UserContext } from "./components/context/user";

const App = () => {
  const roomCode = window.sessionStorage.getItem("roomCode");

  const [userContext, setUserContext] = useState({
    avatar: "",
    playerName: "",
    roomCode: "",
    socket: "",
  });

  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
      <>{userContext.roomCode || roomCode ? <GameContainer /> : <LandingPage />}</>
    </UserContext.Provider>
  );
};

export default App;
