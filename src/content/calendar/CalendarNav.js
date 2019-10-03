import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SimpleReactCalendar from 'simple-react-calendar';
import '../../styles/calendar/NavCalendar.css';


class NavCalendar extends Component {
  state = {
    selectedDate: new Date(),
  }

  onSelectHandler = (date) => {
    this.setState({
      selectedDate: date,
    })

    this.props.onSelectHandler(date);
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
            <div className='nav-item-btn'>
              <NavLink to='/calendar/new' exact>
                <i className='fas fa-plus'></i>Add task
            </NavLink>
            </div>
          </ul>
        </nav>
      </>
    );
  }
}

export default NavCalendar;
