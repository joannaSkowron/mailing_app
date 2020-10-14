import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './styles/layout/index.css';
import App from './layout/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'));

serviceWorker.unregister();
