import React, { Component } from 'react';
import CalendarTaskListDay from './CalendarTaskListDay';
import CalendarTaskListWeek from './CalendarTaskListWeek';

import '../../styles/calendar/CalendarTaskList.css';



class CalendarTaskList extends Component {

  state = {
    selectedView: 'day',
  }

  selectedViewHandler = (selectedView) => {
    this.setState({
      selectedView,
    })
  }

  renderView = () => {
    if (this.state.selectedView === 'day') {
      return <CalendarTaskListDay selectedDate={this.props.selectedDate} />
    } else {
      return <CalendarTaskListWeek selectedDate={this.props.selectedDate} />
    }
  }

  render() {
    return (
      <>
        {console.log(this.props.selectedDate.toLocaleString())}
        <div className="calendar-tasklist-tools-container">
          <div className="calendar-tasklist-buttons">

            <button
              className={this.state.selectedView === 'day' ? 'calendar-tasklist-btn active' : 'calendar-tasklist-btn'}
              title='Switch to day view'
              onClick={() => this.selectedViewHandler('day')} >Day</button>

            <button
              className={this.state.selectedView === 'week' ? 'calendar-tasklist-btn active' : 'calendar-tasklist-btn'}
              title='Switch to week view'
              onClick={() => this.selectedViewHandler('week')}>Week</button>

          </div>
        </div>

        <div className="calendar-tasklist-container">
          {this.renderView()}
        </div>
      </>
    );
  }
}

export default CalendarTaskList;