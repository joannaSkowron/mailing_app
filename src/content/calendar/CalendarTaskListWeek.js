import React, { Component } from 'react';
import '../../styles/calendar/CalendarTaskListWeek.css';


class CalendarTaskListWeek extends Component {

  state = {}
  dayOftheWeekMap = {
    0: 7,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6
  }

  generateDivs = (count, cls, ifClock) => {
    let divs = [];
    for (let i = 0; i < count; i++) {
      divs.push(<div key={i} className={cls}>{ifClock ? `${i + 1}:00` : null}</div>)
    }
    return divs;
  }

  getFirstDayOfWeek = (date) => {
    let dateWeekDay = date.getDay();
    date.setDate(date.getDate() - this.dayOftheWeekMap[dateWeekDay] + 1);
    return date.toLocaleDateString();
  }

  getLastDayOfWeek = (date) => {
    let dateWeekDay = date.getDay();
    date.setDate(date.getDate() + (7 - this.dayOftheWeekMap[dateWeekDay]));
    return date.toLocaleDateString();
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
          {this.getFirstDayOfWeek(this.props.selectedDate)} - {this.getLastDayOfWeek(this.props.selectedDate)}
        </h1>
        <div className="calendar-tasklist-week-container">

          <div className="calendar-tasklist-week-clock">
            <div className="calendar-tasklist-week-clock-item calendar-tasklist-item-first"></div>
            {this.generateDivs(23, 'calendar-tasklist-week-clock-item', true)}
          </div>

          <div className="calendar-tasklist-week-table">
            <div className="calendar-tasklist-week-table-item calendar-tasklist-item-first"></div>
            {this.generateDivs(23, 'calendar-tasklist-week-table-item', false)}
          </div>

        </div>
      </>
    );
  }
}

export default CalendarTaskListWeek;