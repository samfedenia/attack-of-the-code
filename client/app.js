import axios from 'axios';
import React, { useState, useEffect } from "react";
// import { Route } from 'react-router-dom';
import Home from './components/home';
import LandingPage from './components/LandingPage';
import GameContainer from './components/GameContainer';
import { UserContext } from "./components/context/user";
import { ViewContext } from "./components/context/view";
import { BackgroundContext } from './components/context/background';
import Loading from './components/Loading';
import Editor from './components/Editor';

const App = () => {
  const roomCode = window.sessionStorage.getItem("roomCode");

  const [userContext, setUserContext] = useState({
    avatar: "",
    playerName: "",
    roomCode: "",
    socket: "",
    score: 0,
    submitted: false,
  });

  const [view, setView] = useState({loading: true});

  const [backgrounds, setBackgrounds] = useState([]);

  useEffect(() => {
    setTimeout(() => setView({ loading: false }), 2000);
  }, [])

  const getBackgrounds = async () => {
    const { data: backgrounds } = await axios.get('/api/backgrounds');
    return backgrounds;
  };

  useEffect(() => {
    getBackgrounds().then((backgrounds) => {
      setBackgrounds(backgrounds);
    });
  }, [])


  return view.loading ? (
    <Loading />
  ) : (
    // <Editor />
    <UserContext.Provider value={[userContext, setUserContext]}>
      <BackgroundContext.Provider value={[backgrounds, setBackgrounds]}>
        {userContext.roomCode || roomCode ? (
          <GameContainer view={view} setView={setView} />
        ) : (
          <LandingPage view={view} setView={setView} />
        )}
      </BackgroundContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
