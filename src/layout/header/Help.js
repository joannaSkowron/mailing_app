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
          <p>About this project</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi possimus voluptas inventore cumque quia iusto quae porro sint saepe vero dicta facilis harum excepturi labore, minus deserunt natus optio. Rem!</p>
          <p>To read more visit <Link to='/account'>About</Link> page.</p>
        </div>
      </div>

    );
  }
}

export default Help;