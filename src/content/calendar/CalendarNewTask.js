import React, { Component } from 'react';
import '../../styles/calendar/CalendarNewTask.css';
import {
  Validator,
  validateRequired,
  useValidateMaxLenght,
  useValidateTimeValues,
  ValidationConfig,
} from "../../tools/Validator";
import DatePicker from 'react-date-picker';
import { FetchService } from '../../services/FetchService';
import {
  generateTimeOptions,
  getISODateFromSelectedDateAndTime
} from '../../tools/CalendarHelper';
import Button from '../../components/Button';
import FormInputErrMsg from '../../components/FormInputErrMsg';

class CalendarNewTask extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: null,
      title: '',
      date: new Date(),
      start: '12:00',
      end: '12:30',
      description: '',
      validationResult: null,
    };

    this.fetchService = new FetchService();
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
      validationResult: null,
    })
  }

  handleDatePickerChange = (date) => {
    this.setState({ date });
  }

  handleSave = (event) => {
    event.preventDefault();
    const { id, title, date, start, end, description } = this.state;

    const dateTimeStart = getISODateFromSelectedDateAndTime(date, start);
    const dateTimeEnd = getISODateFromSelectedDateAndTime(date, end);

    const dataJSON = JSON.stringify({
      dateTimeStart: dateTimeStart,
      dateTimeEnd: dateTimeEnd,
      title: title,
      notes: description
    });

    const validationConfigs = [
      new ValidationConfig('title', [validateRequired, useValidateMaxLenght(20)]),
      new ValidationConfig('date', [validateRequired]),
      new ValidationConfig('start', [validateRequired]),
      new ValidationConfig('end', [validateRequired, useValidateTimeValues(start)]),
    ];

    const validationResult = new Validator(validationConfigs).validate(this.state);
    this.setState({
      validationResult
    });

    if (validationResult.isValid) {
      const API = id ? `/api/calendar/${id}` : `/api/calendar`;
      const options = {
        method: id ? 'put' : 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: dataJSON,
      };

      const successCallback = () => {
        this.props.handleCancelBtn();
        if (this.props.task !== undefined) {
          this.props.handleUpdateData();
        }
        if (this.props.performCalendarTaskListUpdateHandler !== undefined) {
          this.props.performCalendarTaskListUpdateHandler();
        }
      };

      const failureCallback = (err) => {
        console.log(err.name);
      };

      this.fetchService.useFetch(API, options, successCallback, failureCallback);
    }
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
    const titleErrMsg = this.getValidationError('title');
    const dateErrMsg = this.getValidationError('date');
    const startErrMsg = this.getValidationError('start');
    const endErrMsg = this.getValidationError('end');

    return (
      <>
        <div className="calendar-newtask-page-container" onClick={this.props.handleCancelBtn}>
        </div>
        <div className="calendar-newtask-container">
          <div className="calendar-newtask-form">

            {titleErrMsg && <FormInputErrMsg errMsg={titleErrMsg} />}

            <div className="calendar-newtask-form-input-container">
              <input type="text"
                className="calendar-newtask-form-input calendar-newtask-form-input-title"
                name="title"
                placeholder="Add title"
                value={this.state.title}
                onChange={this.handleChange}
              />

            </div>

            <p className='calendar-newtask-error-messages-container'>

              {dateErrMsg && <FormInputErrMsg errMsg={dateErrMsg} />}
              {startErrMsg && <FormInputErrMsg errMsg={startErrMsg} />}
              {endErrMsg && <FormInputErrMsg errMsg={endErrMsg} />}

            </p>

            <div className="calendar-newtask-form-input-container">
              <i className="far fa-calendar-alt"></i>

              <DatePicker
                onChange={this.handleDatePickerChange}
                value={this.state.date}
              />

              <i className="far fa-clock"></i>
              <select
                className="calendar-newtask-form-input"
                name="start"
                value={this.state.start}
                onChange={this.handleChange}>
                {generateTimeOptions()}
              </select>
              <i className="fas fa-minus"></i>
              <select
                className="calendar-newtask-form-input"
                name="end"
                value={this.state.end}
                onChange={this.handleChange}>
                {generateTimeOptions()}
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
              <Button
                type='button'
                buttonStyle='primary'
                handleClick={this.handleSave}
                text='Save' />
              <Button
                type='button'
                buttonStyle='secondary'
                handleClick={this.props.handleCancelBtn}
                text='Cancel' />
            </div>

          </div>
        </div>

      </>
    );
  }
}

export default CalendarNewTask;