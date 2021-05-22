import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home';
import Cycle from './components/Cycle';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <div>
      <LandingPage />
      {/* <Cycle /> */}
    </div>
  );
};

export default App;
