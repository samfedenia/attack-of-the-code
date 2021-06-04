import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import GameContainer from './components/GameContainer';
import { CombinedContextProvider } from './components/context';
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
    <CombinedContextProvider
      userProfs={[userState, setUserState]}
      gameProfs={[gameState, setGameState]}
      viewProfs={[view, setView]}
      backgroundProfs={[backgrounds, setBackgrounds]}
    >
      {userState.roomCode || roomCode ? <GameContainer /> : <LandingPage />}
    </CombinedContextProvider>
  );
};

export default App;
