import React from 'react';
import '../../styles/about/About.css';

const About = () => {
  return (


    <div className="about-container">
      <div className="about-content-header">About this app</div>
      <div className="about-content-container">
        <p>
          This app was created as a training exercise to improve programming skills. It is a simplified version of a mailbox, with features listed below.
        </p>

        <p className="title">Features</p>
        <div>

          <div className="about-content-features">
            <i className='far fa-envelope-open'></i>
            <p>Email - displays a list of sample messages, with ability to proceed with basic operations, such as: composing, deleting, editing messages, moving messages between folders. Sending emails is simulated only.</p>
          </div>

          <div className="about-content-features">
            <i className='far fa-calendar-alt'></i>
            <p>Calendar - planner with day and week view, displaying tasks in date / time matrix. Allows to add new, edit and delete existing tasks.</p>
          </div>

          <div className="about-content-features">
            <i className='far fa-address-book'></i>
            <p>Addressbook - displays list of sample contact records, which can be edited, deleted or messaged (by linking to email compose component).</p>
          </div>

        </div>

        <p className="title">Technologies used</p>
        <p>
          This is a web SPA developed in React, connected to an external API. All changes are saved in API memory (they are not saved in a database). All data is periodically reset.
        </p>

      </div>
    </div>


  );
}

export default About;