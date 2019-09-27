import React from 'react';
import '../styles/components/Spinner.css';

const Spinner = () => {
  return (

    <>
      <div className="spinner">
        <div className="lds-css ng-scope">
          <div className="lds-spinner" style={{ width: '100%', height: '100%' }}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    </>

  );
}

export default Spinner;