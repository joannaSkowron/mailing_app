import React from 'react';
import EmailNav from './EmailNav';
import EmailPage from './EmailPage';
import '../../styles/layout/Content.css';

const Email = () => {
  return (
    <>

      <div className="navigation"> {<EmailNav />} </div>
      <div className="page"> {<EmailPage />}</div>

    </>
  );
}

export default Email;