import React, { Component } from 'react';
import SimpleReactCalendar from 'simple-react-calendar';
import CalendarNewTask from './CalendarNewTask';
import '../../styles/calendar/NavCalendar.css';


class NavCalendar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: new Date(),
      addTaskActive: false,
    }
  }

  onSelectHandler = (date) => {
    this.setState({
      selectedDate: date,
    })

    this.props.onSelectHandler(date);
  }

  handleAddTask = () => {
    this.setState({
      addTaskActive: true,
    })
  }

  handleCancelBtn = () => {
    this.setState({
      addTaskActive: false,
    })
  }

  render() {
    return (
      <>

        <SimpleReactCalendar selected={this.state.selectedDate} onSelect={this.onSelectHandler} mode="single" />

        <nav className='nav-container'>
          <ul className='nav'>
            <div className='nav-item-btn-calendar'>
              <button onClick={this.handleAddTask}>
                <i className='fas fa-plus'></i>
                Add task
              </button>
            </div>
          </ul>
        </nav>

        {this.state.addTaskActive ?
          <CalendarNewTask
            handleCancelBtn={this.handleCancelBtn}
            selectedDate={this.state.selectedDate}
            performCalendarTaskListUpdateHandler={this.props.performCalendarTaskListUpdateHandler}
          /> : null}

      </>
    );
  }
}

export default NavCalendar;
