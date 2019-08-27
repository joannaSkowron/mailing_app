import React, { Component } from 'react';
import '../styles/DateSorting.css';

class DateSorting extends Component {

  state = {
    newestFirst: true,
  }

  handleDateSorting = () => {
    debugger;
    this.setState(prevState => ({
      newestFirst: !prevState.newestFirst,
    }))

  }

  render() {
    return (

      <>
        <div
          className="date-sorting-container"
          title={this.state.newestFirst ? 'Newest first' : 'Oldest first'}
          onClick={this.handleDateSorting}>
          <i
            className={this.state.newestFirst ? "fas fa-sort-up date-sorting" : "fas fa-sort-down date-sorting"}></i>
        </div>
      </>

    );
  }
}

export default DateSorting;