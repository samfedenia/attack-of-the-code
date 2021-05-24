import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home';
import LandingPage from './components/LandingPage';
import GameContainer from './components/GameContainer';

const App = () => {
  return (
    <>
      <LandingPage />
      {/* <GameContainer /> */}
    </>
  );
};

export default App;
