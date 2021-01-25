import React, { Component } from 'react';
import Notifications from './Notifications';
import Settings from './Settings';
import Help from './Help';
import '../../styles/layout/header/NotificationsBar.css';

class NotificationsBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notificationsActive: false,
      settingsActive: false,
      helpActive: false,
    }
  }

  handleMouseEnter = (hoveredItem) => {
    this.setState({
      [hoveredItem]: true,
    })
  }

  handleMouseLeave = (hoveredItem) => {
    setTimeout(() => {
      this.setState({
        [hoveredItem]: false,
      })
    }, 200)
  }

  render() {
    return (
      <div className="notifications">
        <div className="notifications-item" title="Notifications"
          onMouseEnter={() => this.handleMouseEnter('notificationsActive')}
          onMouseLeave={() => this.handleMouseLeave('notificationsActive')}
        >
          <i className="fas fa-bell"></i>
          <div className="notifications-item-counter">12</div>
          {this.state.notificationsActive ? <Notifications /> : null}
        </div>
        <div className="notifications-item" title="Settings"
          onMouseEnter={() => this.handleMouseEnter('settingsActive')}
          onMouseLeave={() => this.handleMouseLeave('settingsActive')}
        >
          <i className="fas fa-cog"></i>
          {this.state.settingsActive ?
            <Settings
              handleBackgroundChange={this.props.handleBackgroundChange} />
            : null}
        </div>
        <div className="notifications-item" title="Help"
          onMouseEnter={() => this.handleMouseEnter('helpActive')}
          onMouseLeave={() => this.handleMouseLeave('helpActive')}
        >
          <i className="fas fa-question-circle"></i>
          {this.state.helpActive ? <Help /> : null}
        </div>
      </div>
    );
  }
}

export default NotificationsBar;