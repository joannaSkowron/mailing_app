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

  testData = [
    {
      id: 1,
      title: "Test task title 1",
      dateStart: new Date('10.07.2019 11:00:00'),
      dateEnd: new Date('10.07.2019 12:00:00'),
      description: "This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task.",
    },
    {
      id: 2,
      title: "Test task title 2",
      dateStart: new Date('10.08.2019 16:00:00'),
      dateEnd: new Date('10.08.2019 17:00:00'),
      description: "This is fake description for this test task.",
    },
    {
      id: 3,
      title: "Test task title 3",
      dateStart: new Date('10.09.2019 13:00:00'),
      dateEnd: new Date('10.09.2019 13:30:00'),
      description: "This is fake description for this test task.",
    },
    {
      id: 4,
      title: "Test task title 4",
      dateStart: new Date('10.09.2019 14:00:00'),
      dateEnd: new Date('10.09.2019 14:30:00'),
      description: "This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task.",
    },
    {
      id: 5,
      title: "Test task title 5",
      dateStart: new Date('10.09.2019 13:30:00'),
      dateEnd: new Date('10.09.2019 14:00:00'),
      description: "This is fake description for this test task.",
    },
    {
      id: 6,
      title: "Test task title 6",
      dateStart: new Date('10.09.2019 07:00:00'),
      dateEnd: new Date('10.09.2019 09:30:00'),
      description: "This is fake description for this test task.",
    },
  ]

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
    return date;
  }

  generateTitleDivs = (count, cls) => {
    let divs = [];
    const selectedDate = new Date(this.props.selectedDate);
    const monday = new Date(this.getFirstDayOfWeek(selectedDate));
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i < count; i++) {
      const fullDate = new Date(monday.setDate(monday.getDate() + i));
      const day = fullDate.getDate();
      const month = monthNames[fullDate.getMonth()];
      divs.push(<div key={i} className={cls}>{day} {month.toUpperCase()}</div>)
    }
    return divs;
  }

  // getLastDayOfWeek = (date) => {
  //   let dateWeekDay = date.getDay();
  //   date.setDate(date.getDate() + (7 - this.dayOftheWeekMap[dateWeekDay]));
  //   return date.toLocaleDateString();
  // }

  getWeekDay = (date) => {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = date.getDay();
    return weekdays[day];
  }

  renderTasks = () => {
    const tasks = this.testData.map(task => {

      const positionFromTopOfContainer = `${(task.dateStart.getHours() * 60) + task.dateStart.getMinutes()}px`;
      const positionFromLeftOfContainer = `${this.dayOftheWeekMap[task.dateStart.getDay()] * (100 / 7)}%`;
      const height = `${(task.dateEnd - task.dateStart) / (60 * 1000)}px`;
      const style = {
        top: positionFromTopOfContainer,
        left: positionFromLeftOfContainer,
        height: height,
      };

      return (
        <div key={task.id} className="calendar-tasklist-week-task" style={style}>
          <div className="calendar-tasklist-week-title-container">
            <h1 className="calendar-tasklist-week-task-title">{task.title}</h1>
            <p className="calendar-tasklist-week-task-date">{task.dateStart.toLocaleTimeString()} - {task.dateEnd.toLocaleTimeString()}</p>
          </div>
          <p className="calendar-tasklist-week-task-description">{task.description}</p>
        </div>
      )
    })
    return tasks;
  }

  render() {

    return (

      <>
        <div className="calendar-tasklist-week-title">
          {/* {this.getFirstDayOfWeek(this.props.selectedDate)} - {this.getLastDayOfWeek(this.props.selectedDate)} */}
          {this.generateTitleDivs(7, "calendar-tasklist-week-title-item")}
        </div>
        <div className="calendar-tasklist-week-container">

          <div className="calendar-tasklist-week-clock">
            <div className="calendar-tasklist-week-clock-item calendar-tasklist-item-first"></div>
            {this.generateDivs(23, 'calendar-tasklist-week-clock-item', true)}
          </div>

          <div className="calendar-tasklist-week-table">
            <div className="calendar-tasklist-week-table-item calendar-tasklist-item-first"></div>
            {this.generateDivs(23, 'calendar-tasklist-week-table-item', false)}
            <div className="calendar-tasklist-week-days-container">
              {this.generateDivs(7, 'calendar-tasklist-week-days-item', false)}

              {this.renderTasks()}

            </div>
          </div>

        </div>
      </>
    );
  }
}

export default CalendarTaskListWeek;