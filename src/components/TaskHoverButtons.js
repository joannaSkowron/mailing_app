import React, { Component } from 'react';
import CalendarNewTask from '../content/calendar/CalendarNewTask';
import '../styles/components/TaskHoverButtons.css';


class TaskHoverButtons extends Component {
  state = {
    editTaskActive: false,
  }

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
    console.log("EDIT this shit" + this.props.task.id);
    this.setState({
      editTaskActive: true,
    })
  }

  handleDeleteButton = () => {
    console.log("DELETE" + this.props.task.id)
    this.fetchData(this.props.task.id)
  }

  handleCancelBtn = () => {
    this.setState({
      editTaskActive: false,
    })
  }

  render() {
    return (
      <>

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

        {this.state.editTaskActive ?
          <CalendarNewTask
            handleCancelBtn={this.handleCancelBtn}
            task={this.props.task}
          /> : null
        }

      </>
    );
  }
}

export default TaskHoverButtons;