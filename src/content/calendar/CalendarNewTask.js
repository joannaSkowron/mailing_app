import React, { Component } from 'react';
import '../../styles/calendar/CalendarNewTask.css';
import { Validator, ValidationResult, validateRequired, useValidateMaxLenght, ValidationConfig } from "../../tools/Validator"

class CalendarNewTask extends Component {

  state = {
    id: null,
    title: '',
    date: '',
    start: '12:00',
    end: '12:30',
    description: '',
    validationResult: null
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

    const validationConfigs = [
      new ValidationConfig("title", [validateRequired, useValidateMaxLenght(15)]),
    ];

    const validationResult = new Validator(validationConfigs).validate(this.state);
    this.setState({
      validationResult
    });

    if (validationResult.isValid) {
      // wywołujemy API
    }

    console.log(validationResult);

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
    let API = `https://catmail.azurewebsites.net/api/calendar`;
    let method = 'post';
    if (this.state.id !== null) {
      method = 'put';
      API = `https://catmail.azurewebsites.net/api/calendar/${this.state.id}`;
    };

    // fetch(API, {
    //   method: method,
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json'
    //   },
    //   body: dataJSON,
    // })
    //   .then(response => {
    //     if (response.ok) {
    //       this.props.handleCancelBtn();
    //       if (this.props.task !== undefined) {
    //         this.props.handleUpdateData();
    //       }
    //     } else { throw Error('Error') }
    //   })
    //   .catch(error => {
    //     console.log('Request failed', error);
    //     alert("Sorry, your request to save failed")
    //   });
  }

  getValidationError(fieldName) {
    if (this.state.validationResult) {
      return this.state.validationResult.getErrorMessage(fieldName);
    }
  }

  componentDidMount = () => {
    if (this.props.task !== undefined) {

      const start = new Date(this.props.task.dateTimeStart).toLocaleTimeString().slice(0, 5);
      const end = new Date(this.props.task.dateTimeEnd).toLocaleTimeString().slice(0, 5);

      this.setState({
        id: this.props.task.id,
        title: this.props.task.title,
        date: new Date(this.props.task.dateTimeStart),
        start: start,
        end: end,
        description: this.props.task.notes,
      })
    } else {
      this.setState({
        date: new Date(this.props.selectedDate),
      })
    }
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
              {this.getValidationError('title')}
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