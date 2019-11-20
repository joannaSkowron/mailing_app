import React, { Component } from 'react';
import '../../styles/calendar/CalendarNewTask.css';

class CalendarNewTask extends Component {

  state = {
    title: '',
    date: '',
    start: '12:00',
    end: '12:30',
    description: '',
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    })
  }

  generateTimeOptions = () => {
    const time = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '23:59',];

    const options = time.map(option => (
      <option key={option} value={option}>{option}</option>
    ));

    return options;
  }

  handleSave = (event) => {
    event.preventDefault();

    const { title, date, start, end, description } = this.state;

    let dateTimeStart = new Date(date);
    const startArray = start.split(':');
    dateTimeStart.setHours(startArray[0], startArray[1], 0, 0)
    dateTimeStart.toISOString();

    let dateTimeEnd = new Date(date);
    const endArray = end.split(':');
    dateTimeEnd.setHours(endArray[0], endArray[1], 0, 0)
    dateTimeEnd.toISOString();

    const data = {
      dateTimeStart: dateTimeStart,
      dateTimeEnd: dateTimeEnd,
      title: title,
      notes: description
    };

    const dataJSON = JSON.stringify(data);

    const API = `https://catmail.azurewebsites.net/api/calendar`;

    fetch(API, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: dataJSON,
    })
      .then(response => {
        if (response.ok) {
          this.setState({
            redirectToInbox: true,
          });
          this.props.handleCancelBtn();
        } else { throw Error('Error') }
      })
      .catch(error => {
        console.log('Request failed', error);
        alert("Sorry, your request to save failed")
      });
  }


  componentDidMount = () => {
    this.setState({
      date: this.props.selectedDate,
    })
  }

  render() {
    return (
      <>
        <div className="calendar-newtask-page-container" onClick={this.props.handleCancelBtn}>
        </div>
        <div className="calendar-newtask-container">
          <div className="calendar-newtask-form">

            <div className="calendar-newtask-form-input-container">
              <input type="text"
                className="calendar-newtask-form-input calendar-newtask-form-input-title"
                name="title"
                placeholder="Add title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>

            <div className="calendar-newtask-form-input-container">
              <i className="far fa-calendar-alt"></i>
              <input type="text"
                className="calendar-newtask-form-input"
                name="date"
                placeholder="Date"
                value={new Date(this.state.date).toLocaleDateString()}
                onChange={this.handleChange}
              />
              <i className="far fa-clock"></i>
              <select
                className="calendar-newtask-form-input"
                name="start"
                value={this.state.start}
                onChange={this.handleChange}>
                {this.generateTimeOptions()}
              </select>
              <i className="fas fa-minus"></i>
              <select
                className="calendar-newtask-form-input"
                name="end"
                value={this.state.end}
                onChange={this.handleChange}>
                {this.generateTimeOptions()}
              </select>
            </div>

            <div className="calendar-newtask-form-input-container">
              <textarea
                className="calendar-newtask-form-input calendar-newtask-form-input-desc"
                name="description"
                placeholder="Notes..."
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>

            <div className="calendar-newtask-form-buttons">
              <button className="calendar-newtask-form-btn"
                onClick={this.handleSave}
              >Save</button>
              <button className="calendar-newtask-form-btn"
                onClick={this.props.handleCancelBtn}
              >Cancel</button>
            </div>

          </div>
        </div>
      </>
    );
  }
}

export default CalendarNewTask;