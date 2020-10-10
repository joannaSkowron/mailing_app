import React, { Component } from 'react';
import TaskHoverButtons from '../../components/TaskHoverButtons';
import {
  handleCalendarScrollTop,
  dayOftheWeekMap,
  generateDivs,
  generateTitleDivs,
  getWeekDateRange,
} from '../../tools/CalendarHelper';
import { FetchService } from '../../services/FetchService';
import '../../styles/calendar/CalendarTaskListWeek.css';


class CalendarTaskListWeek extends Component {

  constructor(props) {
    super(props);
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
    const weekDateRange = getWeekDateRange(this.props.selectedDate);
    this.fetchData(...weekDateRange);
  }

  renderTasks = () => {
    if (this.state.data === null) return;

    const tasks = this.state.data.map(task => {

      const start = new Date(task.dateTimeStart);
      const end = new Date(task.dateTimeEnd)

      const positionFromTopOfContainer = `${(start.getHours() * 60) + start.getMinutes()}px`;
      const positionFromLeftOfContainer = `${(dayOftheWeekMap[start.getDay()] - 1) * (100 / 7)}%`;
      const height = `${(end - start) / (60 * 1000)}px`;
      const style = {
        top: positionFromTopOfContainer,
        left: positionFromLeftOfContainer,
        height: height,
      };

      return (
        <div
          key={task.id}
          className="calendar-tasklist-week-task"
          style={style}>
          <div className="calendar-tasklist-week-task-content-container">
            <div className="calendar-tasklist-week-title-container">
              <h1 className="calendar-tasklist-week-task-title">{task.title}</h1>
              <p className="calendar-tasklist-week-task-date">
                {start.toLocaleTimeString().slice(0, 5)} - {end.toLocaleTimeString().slice(0, 5)}
              </p>
            </div>
            <p className="calendar-tasklist-week-task-description">{task.notes}</p>
          </div>

          <TaskHoverButtons
            task={task}
            handleUpdateData={this.handleUpdateData}
          />
        </div>
      )
    })
    return tasks;
  }

  componentDidMount() {
    this.handleUpdateData();
    handleCalendarScrollTop('.calendar-tasklist-week-container');
  }

  componentWillUnmount() {
    this.fetchService.abortFetch();
  }

  render() {
    return (

      <>
        <div className="calendar-tasklist-week-title">
          {generateTitleDivs(7, "calendar-tasklist-week-title-item", this.props.selectedDate)}
        </div>

        <div className="calendar-tasklist-week-container">
          <div className="calendar-tasklist-week-clock">
            <div className="calendar-tasklist-week-clock-item calendar-tasklist-item-first"></div>
            {generateDivs(23, 'calendar-tasklist-week-clock-item', true)}
          </div>

          <div className="calendar-tasklist-week-table">
            <div className="calendar-tasklist-week-table-item calendar-tasklist-item-first"></div>
            {generateDivs(23, 'calendar-tasklist-week-table-item', false)}
            <div className="calendar-tasklist-week-days-container">
              {generateDivs(7, 'calendar-tasklist-week-days-item', false)}

              {this.renderTasks()}

            </div>
          </div>

        </div>
      </>
    );
  }
}

export default CalendarTaskListWeek;