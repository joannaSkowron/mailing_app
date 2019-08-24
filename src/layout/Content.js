import React from 'react';
import Navigation from './Navigation';
import Page from './Page';
import '../styles/Content.css';

const Content = () => {
  return (
    <>
      <div className="content-container">
        <div className="navigation"> {<Navigation />} </div>
        <div className="page"> {<Page />}</div>
      </div>
    </>
  );
}

export default Content;