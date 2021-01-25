import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout/header/Help.css';

class Help extends Component {

  state = {}

  render() {

    return (

      <div className="help-container">
        <div className="help-header">
          <p>What is this?</p>
        </div>
        <div className="help-content">

          <p>This app was created as a training exercise to improve programming skills. It is a simplified version of a mailbox with calendar and addressbook features.</p>
          <p>To read more, visit  <Link to='/about'>About</Link> page.</p>
        </div>
      </div>

    );
  }
}

export default Help;