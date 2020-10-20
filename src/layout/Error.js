import React from 'react';
import '../styles/layout/Error.css';

const Error = () => {
  return (
    <div className="error-page">
      <i className="fas fa-exclamation-triangle"></i>
      <p className="error-page-notification">This page does not exist.</p>
    </div>
  );
}

export default Error;