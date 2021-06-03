import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import { Route } from 'react-router-dom';
import Home from './components/home';
import LandingPage from './components/LandingPage';
import GameContainer from './components/GameContainer';
import { UserContext } from './components/context/user';
import { ViewContext } from './components/context/view';
import { BackgroundContext } from './components/context/background';
import { GameContext } from './components/context/game';
import Loading from './components/Loading';
import Editor from './components/Editor';

const App = () => {
  const roomCode = window.sessionStorage.getItem('roomCode');

  const [userState, setUserState] = useState({
    avatar: '',
    playerName: '',
    roomCode: '',
    socket: '',
    score: 0,
    submitted: false,
  });

  const [gameState, setGameState] = useState({
    timeLimit: 90,
    gameStatus: 'setup', //playing, between, gameover
    level: 'demo',
    round: 1,
  });

  const [view, setView] = useState({
    loading: true,
    background: '',
    font: '',
  });

  const [backgrounds, setBackgrounds] = useState([]);

  useEffect(() => {
    setTimeout(() => setView({ loading: false }), 2000);
  }, []);

  const getBackgrounds = async () => {
    const { data: backgrounds } = await axios.get('/api/backgrounds');
    return backgrounds;
  };

  useEffect(() => {
    getBackgrounds().then((backgrounds) => {
      setBackgrounds(backgrounds);
    });
  }, []);

  return view.loading ? (
    <Loading />
  ) : (
    // <Editor />
    <ViewContext.Provider value={[view, setView]}>
      <GameContext.Provider value={[gameState, setGameState]}>
        <UserContext.Provider value={[userState, setUserState]}>
          <BackgroundContext.Provider value={[backgrounds, setBackgrounds]}>
            {userState.roomCode || roomCode ? (
              <GameContainer />
            ) : (
              <LandingPage />
            )}
          </BackgroundContext.Provider>
        </UserContext.Provider>
      </GameContext.Provider>
    </ViewContext.Provider>
  );
};

export default App;
