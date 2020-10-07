import React, { Component } from 'react';
import TaskHoverButtons from '../../components/TaskHoverButtons';
import {
  handleCalendarScrollTop,
  generateDivs,
  getDayDateRange,
  getWeekDayName,
} from '../../tools/CalendarHelper';
import { FetchService } from '../../services/FetchService';
import '../../styles/calendar/CalendarTaskListDay.css';

class CalendarTaskListDay extends Component {

  constructor() {
    super();

    this.state = {
      data: null,
    };

    this.fetchService = new FetchService();
  }

  fetchData(from, to) {
    const API = `/api/calendar?from=${from}&to=${to}`;
    const options = { method: 'get' };
    const successCallback = (data) => {
      this.setState({ data });
    };
    const failureCallback = (err) => {
      console.log(err);
    }

    this.fetchService.useFetch(API, options, successCallback, failureCallback);
  }

  handleUpdateData = () => {
    const dayDateRange = getDayDateRange(this.props.selectedDate);
    this.fetchData(...dayDateRange);
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
              <p className="calendar-tasklist-day-task-date">
                {start.toLocaleTimeString().slice(0, 5)} - {end.toLocaleTimeString().slice(0, 5)}
              </p>
            </div>
            <p className="calendar-tasklist-day-task-description">{task.notes}</p>
          </div>

          <TaskHoverButtons task={task} handleUpdateData={this.handleUpdateData} />

        </div>
      )
    })

    return tasks;
  }

  componentDidMount() {
    this.handleUpdateData();
    handleCalendarScrollTop('.calendar-tasklist-day-container');
  }

  componentWillUnmount() {
    this.fetchService.abortFetch();
  }

  render() {
    return (

      <>
        <h1 className="calendar-tasklist-day-title">
          {getWeekDayName(this.props.selectedDate)}, {this.props.selectedDate.toLocaleDateString()}
        </h1>
        <div className="calendar-tasklist-day-container">


          <div className="calendar-tasklist-day-clock">
            <div className="calendar-tasklist-day-clock-item calendar-tasklist-item-first"></div>
            {generateDivs(23, 'calendar-tasklist-day-clock-item', true)}
          </div>

          <div className="calendar-tasklist-day-table">
            <div className="calendar-tasklist-day-table-item calendar-tasklist-item-first"></div>
            {generateDivs(23, 'calendar-tasklist-day-table-item', false)}

            {this.renderTasks()}
          </div>

        </div>
      </>
    );
  }
}

export default CalendarTaskListDay;