import React from 'react';
import '../styles/EmailViewTools.css';

const EmailViewTools = () => {
  return (
    <>
      <div className="email-view-tools-container">
        <div className="email-view-tools" title="Reply"><i className="fas fa-reply"></i></div>
        <div className="email-view-tools" title="Reply to all"><i className="fas fa-reply-all"></i></div>
        <div className="email-view-tools" title="Forward"><i className="fas fa-share"></i></div>
        <div className="email-view-tools" title="Move to spam"><i className='fas fa-ban'></i></div>
        <div className="email-view-tools" title="Move to bin"><i className='far fa-trash-alt'></i></div>
      </div>
    </>
  );
}

export default EmailViewTools;