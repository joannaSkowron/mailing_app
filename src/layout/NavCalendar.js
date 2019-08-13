import React, { Component } from 'react';
import SimpleReactCalendar from 'simple-react-calendar';
import '../styles/NavCalendar.css';


class NavCalendar extends Component {
  state = {
    selectedDate: new Date(),
  }

  onSelectHandler = (date) => {
    this.setState({
      selectedDate: date,
    })
  }

  render() {
    return (
      <>
        <header>
          <h1 className='nav-header'>Calendar</h1>
        </header>
        <SimpleReactCalendar selected={this.state.selectedDate} onSelect={this.onSelectHandler} mode="single" />
      </>
    );
  }
}

export default NavCalendar;
