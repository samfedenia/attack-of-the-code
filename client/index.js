import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './app';
import { SocketContext, socket } from './components/context/socket';

ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <Router>
      <App />
    </Router>
  </SocketContext.Provider>,
  document.getElementById('app')
);
