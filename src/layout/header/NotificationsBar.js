import React, { Component } from 'react';
import Notifications from './Notifications';
import Settings from './Settings';
import Help from './Help';
import '../../styles/layout/header/NotificationsBar.css';

class NotificationsBar extends Component {

  state = {
    notificationsActive: false,
    settingsActive: false,
    helpActive: false,
  }

  handleClick = (clickedItem) => {
    this.setState((state) => ({
      [clickedItem]: !state[clickedItem]
    }))
  }

  render() {
    return (
      <div className="notifications">
        <div className="notifications-item" title="Notifications"
          onMouseEnter={() => this.handleClick('notificationsActive')}
          onMouseLeave={() => this.handleClick('notificationsActive')}
        >
          <i className="fas fa-bell"></i>
          <div className="notifications-item-counter">69</div>
          {this.state.notificationsActive ? <Notifications /> : null}
        </div>
        <div className="notifications-item" title="Settings"
          onMouseEnter={() => this.handleClick('settingsActive')}
          onMouseLeave={() => this.handleClick('settingsActive')}
        >
          <i className="fas fa-cog"></i>
          {this.state.settingsActive ? <Settings /> : null}
        </div>
        <div className="notifications-item" title="Help"
          onMouseEnter={() => this.handleClick('helpActive')}
          onMouseLeave={() => this.handleClick('helpActive')}
        >
          <i className="fas fa-question-circle"></i>
          {this.state.helpActive ? <Help /> : null}
        </div>
      </div>
    );
  }
}

export default NotificationsBar;