import React, { Component } from 'react';
import '../../styles/calendar/CalendarTaskListDay.css';

class CalendarTaskListDay extends Component {
  state = {}

  generateDivs = (count, cls, ifClock) => {
    let divs = [];
    for (let i = 0; i < count; i++) {
      divs.push(<div key={i} className={cls}>{ifClock ? `${i + 1}:00` : null}</div>)
    }
    return divs;
  }

  getWeekDay = (date) => {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = date.getDay();
    return weekdays[day];
  }

  render() {


    return (

      <>
        <h1 className="calendar-tasklist-day-title">
          {this.getWeekDay(this.props.selectedDate)}, {this.props.selectedDate.toLocaleDateString()}
        </h1>
        <div className="calendar-tasklist-day-container">


          <div className="calendar-tasklist-day-clock">
            <div className="calendar-tasklist-day-clock-item calendar-tasklist-item-first"></div>
            {this.generateDivs(23, 'calendar-tasklist-day-clock-item', true)}
          </div>

          <div className="calendar-tasklist-day-table">
            <div className="calendar-tasklist-day-table-item calendar-tasklist-item-first"></div>
            {this.generateDivs(23, 'calendar-tasklist-day-table-item', false)}


          </div>

        </div>
      </>
    );
  }
}

export default CalendarTaskListDay;