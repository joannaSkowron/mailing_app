import React from 'react';
import '../styles/components/TaskHoverButtons.css';


const TaskHoverButtons = () => {
  return (

    <div className="taskHoverButtons-container">
      <button
        className="taskHoverButtons-button"
        title='Edit'>
        <i className="far fa-edit"></i>
      </button>
      <button
        className="taskHoverButtons-button"
        title='Delete'>
        <i className="far fa-trash-alt"></i>
      </button>
    </div>

  );
}

export default TaskHoverButtons;