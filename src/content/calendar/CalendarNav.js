import React, { Component } from 'react';
import SimpleReactCalendar from 'simple-react-calendar';
import CalendarNewTask from './CalendarNewTask';
import '../../styles/calendar/NavCalendar.css';


class NavCalendar extends Component {
  state = {
    selectedDate: new Date(),
    addTaskActive: false,
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
        <header>
          <h1 className='nav-header'>Calendar</h1>
        </header>
        <SimpleReactCalendar selected={this.state.selectedDate} onSelect={this.onSelectHandler} mode="single" />

        <nav className='nav-container'>

          <ul className='nav'>
            <div className='nav-item-btn-calendar'>
              {/* <NavLink to='/calendar/new' exact> */}
              <button onClick={this.handleAddTask}>
                <i className='fas fa-plus'></i>Add task
                </button>
              {/* </NavLink> */}
            </div>
          </ul>
        </nav>

        {this.state.addTaskActive ?
          <CalendarNewTask
            handleCancelBtn={this.handleCancelBtn}
            selectedDate={this.state.selectedDate}
          /> : null}

      </>
    );
  }
}

export default NavCalendar;
