import React, { Component } from 'react';
import TaskHoverButtons from '../../components/TaskHoverButtons';
import '../../styles/calendar/CalendarTaskListDay.css';

class CalendarTaskListDay extends Component {
  state = {
    data: null,
  }

  testData = [
    {
      id: 1,
      title: "Test task title 1",
      dateStart: new Date('10.03.2019 11:00:00'),
      dateEnd: new Date('10.03.2019 12:00:00'),
      description: "This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task.",
    },
    {
      id: 2,
      title: "Test task title 2",
      dateStart: new Date('10.03.2019 16:00:00'),
      dateEnd: new Date('10.03.2019 17:00:00'),
      description: "This is fake description for this test task.",
    },
    {
      id: 3,
      title: "Test task title 3",
      dateStart: new Date('10.03.2019 13:00:00'),
      dateEnd: new Date('10.03.2019 13:30:00'),
      description: "This is fake description for this test task.",
    },
    {
      id: 4,
      title: "Test task title 4",
      dateStart: new Date('10.03.2019 14:00:00'),
      dateEnd: new Date('10.03.2019 14:30:00'),
      description: "This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task. This is fake description for this test task.",
    },
    {
      id: 5,
      title: "Test task title 5",
      dateStart: new Date('10.03.2019 13:30:00'),
      dateEnd: new Date('10.03.2019 14:00:00'),
      description: "This is fake description for this test task.",
    },
    {
      id: 6,
      title: "Test task title 6",
      dateStart: new Date('10.03.2019 07:00:00'),
      dateEnd: new Date('10.03.2019 09:30:00'),
      description: "This is fake description for this test task.",
    },
  ]

  fetchData(from, to) {

    const API = `https://catmail.azurewebsites.net/api/calendar?from=${from}&to=${to}`;
    fetch(API)
      .then(response => {
        if (response.ok) {
          return response
        } throw Error('Error')
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          data,
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

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

  renderTasks = () => {
    if (this.state.data === null) return;

    const tasks = this.state.data.map(task => {

      const start = new Date(task.dateTimeStart);
      const end = new Date(task.dateTimeEnd)

      const positionFromTopOfContainer = `${(start.getHours() * 60) + start.getMinutes()}px`;
      const height = `${(end - start) / (60 * 1000)}px`;
      const style = {
        top: positionFromTopOfContainer,
        height: height,
      };

      return (
        <div key={task.id} className="calendar-tasklist-day-task" style={style}>
          <div className="calendar-tasklist-day-task-content-container">
            <div className="calendar-tasklist-day-title-container">
              <h1 className="calendar-tasklist-day-task-title">{task.title}</h1>
              <p className="calendar-tasklist-day-task-date">{start.toLocaleTimeString()} - {end.toLocaleTimeString()}</p>
            </div>
            <p className="calendar-tasklist-day-task-description">{task.notes}</p>
          </div>

          <TaskHoverButtons taskID={task.id} />

        </div>
      )
    })
    return tasks;
  }

  componentDidMount() {
    const { selectedDate } = this.props;

    let from = new Date(selectedDate);
    from.setHours(0, 0, 0, 0);
    from = from.toISOString();

    let to = new Date(selectedDate);
    to.setHours(23, 59, 59, 999);
    to = to.toISOString();

    this.fetchData(from, to);
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

            {this.renderTasks()}
          </div>

        </div>
      </>
    );
  }
}

export default CalendarTaskListDay;