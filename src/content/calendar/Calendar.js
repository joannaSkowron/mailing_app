import React, { Component } from 'react';
import CalendarNav from './CalendarNav';
import CalendarPage from './CalendarPage';
import '../../styles/layout/Content.css';


class Calendar extends Component {

  state = {
    selectedDate: new Date(),
    performCalendarTaskListUpdate: false,
  }

  onSelectHandler = (date) => {
    this.setState({
      selectedDate: date,
    })
  }

  performCalendarTaskListUpdateHandler = () => {
    this.setState(prevState => ({
      performCalendarTaskListUpdate: !prevState.performCalendarTaskListUpdate,
    }));
  }

  render() {
    return (
      <>

        <div className="navigation">
          {<CalendarNav
            onSelectHandler={this.onSelectHandler}
            performCalendarTaskListUpdateHandler={this.performCalendarTaskListUpdateHandler}
          />} </div>
        <div className="page">
          {<CalendarPage
            selectedDate={this.state.selectedDate}
          />}</div>

      </>
    );
  }
}

export default Calendar;