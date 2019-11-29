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
    const time = [];
    for (let i = 0; i < 24; i++) {
      let fullTime = null;
      let halfTime = null;
      if (i < 10) {
        fullTime = `0${i}:00`;
        halfTime = `0${i}:30`;
      } else {
        fullTime = `${i}:00`;
        halfTime = `${i}:30`;
      }
      time.push(fullTime, halfTime)
    }
    time.push(`23:59`);

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