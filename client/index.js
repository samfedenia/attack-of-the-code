import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './app';
import { SocketContext, socket } from './components/context/socket';
import { UserContext, user } from "./components/context/user";

ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <UserContext.Provider value={user}>
      <Router>
        <App />
      </Router>
    </UserContext.Provider>
  </SocketContext.Provider>,
  document.getElementById("app")
);
