import React from 'react';
import NotificationsBar from './NotificationsBar';
import '../../styles/layout/header/Header.css';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-logo">
        <p>Mailbox</p>
      </div>
      <div className="header-content">
        <NotificationsBar />
        <div className="header-headshot"></div>
      </div>
    </div>
  );
}

export default Header;