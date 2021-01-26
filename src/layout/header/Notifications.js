import React, { Component } from 'react';
import '../../styles/layout/header/Notifications.css';

class Notifications extends Component {

  state = {}

  data = [
    {
      id: 1,
      message: 'You have new mail',
      date: 'today',
      icon: <i className="far fa-envelope-open"></i>,
    },

    {
      id: 2,
      message: 'Check your tasks scheduled for today',
      date: 'today',
      icon: <i className="far fa-calendar-alt"></i>,
    },

    {
      id: 3,
      message: 'You have new mail',
      date: 'yesterday',
      icon: <i className="far fa-envelope-open"></i>,
    },

    {
      id: 4,
      message: 'Check your tasks scheduled for today',
      date: '2 days ago',
      icon: <i className="far fa-calendar-alt"></i>,
    },
    {
      id: 5,
      message: 'Update your settings!',
      date: '1 week ago',
      icon: <i className="fas fa-cog"></i>,
    },
    {
      id: 6,
      message: 'Update your settings!',
      date: '1 week ago',
      icon: <i className="fas fa-cog"></i>,
    },
    {
      id: 7,
      message: 'You have new mail',
      date: '2 weeks ago',
      icon: <i className="far fa-envelope-open"></i>,
    },
    {
      id: 8,
      message: 'You have new mail',
      date: '2 weeks ago',
      icon: <i className="far fa-envelope-open"></i>,
    },
    {
      id: 9,
      message: 'You have new mail',
      date: '2 weeks ago',
      icon: <i className="far fa-envelope-open"></i>,
    },
  ]

  renderNotificationsContent = () => {
    const content = this.data.map(item => (
      <div key={item.id} className="notification-item">
        <p className="notification-message">{item.message}</p>
        <p className="notification-icon">{item.icon}</p>
        <p className="notification-date">{item.date}</p>
      </div>
    ))
    return content;
  }

  render() {
    return (

      <div className="notifications-container">
        <div className="notifications-header">
          <p>Notifications:</p>
          <p className="notifications-header-counter">{this.data.length}</p>
        </div>
        <div className="notifications-content">

          {this.renderNotificationsContent()}

        </div>
      </div>

    );
  }
}

export default Notifications;