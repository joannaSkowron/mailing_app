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

  handleMouseMovement = (hoveredItem) => {
    this.setState((state) => ({
      [hoveredItem]: !state[hoveredItem]
    }))
  }

  render() {
    return (
      <div className="notifications">
        <div className="notifications-item" title="Notifications"
          onMouseEnter={() => this.handleMouseMovement('notificationsActive')}
          onMouseLeave={() => this.handleMouseMovement('notificationsActive')}
        >
          <i className="fas fa-bell"></i>
          <div className="notifications-item-counter">69</div>
          {this.state.notificationsActive ? <Notifications /> : null}
        </div>
        <div className="notifications-item" title="Settings"
          onMouseEnter={() => this.handleMouseMovement('settingsActive')}
          onMouseLeave={() => this.handleMouseMovement('settingsActive')}
        >
          <i className="fas fa-cog"></i>
          {this.state.settingsActive ? <Settings handleBackgroundChange={this.props.handleBackgroundChange} /> : null}
        </div>
        <div className="notifications-item" title="Help"
          onMouseEnter={() => this.handleMouseMovement('helpActive')}
          onMouseLeave={() => this.handleMouseMovement('helpActive')}
        >
          <i className="fas fa-question-circle"></i>
          {this.state.helpActive ? <Help /> : null}
        </div>
      </div>
    );
  }
}

export default NotificationsBar;