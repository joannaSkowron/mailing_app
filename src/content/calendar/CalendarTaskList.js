import React, { Component } from 'react';
import CalendarTaskListDay from './CalendarTaskListDay';
import CalendarTaskListWeek from './CalendarTaskListWeek';
import '../../styles/calendar/CalendarTaskList.css';



class CalendarTaskList extends Component {

  constructor() {
    super();
    this.state = {
      selectedView: 'day',
    }
  }

  selectedViewHandler = (selectedView) => {
    this.setState({
      selectedView,
    })
  }

  renderView = () => {
    if (this.state.selectedView === 'day') {
      console.log(this.props.selectedDate)
      return <CalendarTaskListDay selectedDate={this.props.selectedDate} />
    } else {
      console.log(this.props.selectedDate)
      return <CalendarTaskListWeek selectedDate={this.props.selectedDate} />
    }
  }

  render() {
    return (
      <>
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