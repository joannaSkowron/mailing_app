import React, { Component } from 'react';
import CalendarNewTask from '../content/calendar/CalendarNewTask';
import '../styles/components/TaskHoverButtons.css';


class TaskHoverButtons extends Component {
  state = {}

  fetchData(id) {
    const API = `https://catmail.azurewebsites.net/api/calendar/${id}`;

    fetch(API, {
      method: 'delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (response.ok) {
          return response
        } throw Error('Error')
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleEditButton = () => {
    console.log("EDIT" + this.props.taskID);
    return <CalendarNewTask />
  }

  handleDeleteButton = () => {
    console.log("DELETE" + this.props.taskID)
    this.fetchData(this.props.taskID)
  }

  render() {
    return (

      <div className="taskHoverButtons-container">
        <button
          className="taskHoverButtons-button"
          title='Edit'
          onClick={this.handleEditButton}>
          <i className="far fa-edit"></i>
        </button>
        <button
          className="taskHoverButtons-button"
          title='Delete'
          onClick={this.handleDeleteButton}>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>

    );
  }
}

export default TaskHoverButtons;