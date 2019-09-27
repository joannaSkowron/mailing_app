import React from 'react';
import '../styles/layout/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Menubar from './Menubar';
import Header from './Header';
import Content from './Content';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="header">{<Header />}</div>
        <div className="main-container">
          <div className="menubar">{<Menubar />}</div>
          <div className="content">{<Content />}</div>
        </div>

      </div>
    </Router >
  );
}

export default App;
