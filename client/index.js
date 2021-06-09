import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { CombinedContextProvider } from './components/context';

ReactDOM.render(
  <CombinedContextProvider>
    <App />
  </CombinedContextProvider>,
  document.getElementById('app')
);
