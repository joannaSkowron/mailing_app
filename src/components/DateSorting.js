import React, { Component } from 'react';
import '../styles/components/DateSorting.css';

class DateSorting extends Component {

  state = {
    newestFirst: true,
  }

  handleDateSorting = () => {
    this.setState(prevState => ({
      newestFirst: !prevState.newestFirst,
    }));
    this.props.handleDateSorting(!this.state.newestFirst);
  }

  render() {
    return (

      <>
        <div
          className="date-sorting-container"
          title={this.state.newestFirst ? 'Newest first' : 'Oldest first'}
          onClick={this.handleDateSorting}>
          <i
            className={this.state.newestFirst ? "fas fa-sort-up date-sorting-up" : "fas fa-sort-up date-sorting-down"}></i>
        </div>
      </>

    );
  }
}

export default DateSorting;