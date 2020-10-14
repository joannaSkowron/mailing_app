import React from 'react';
import '../styles/components/Pager.css';


const Pager = (props) => {

  const pageNumber = props.pagesCount !== 0 ? props.currentPage : 0;

  return (
    <>
      <div className="pager-container">

        <p className="pager-location">page {pageNumber} of {props.pagesCount}</p>
        <button
          className="pager-btn"
          title='Previous'
          onClick={() => props.handlePageChange(-1)}>
          <i className="fas fa-chevron-left" ></i>
        </button>
        <button
          className="pager-btn"
          title='Next'
          onClick={() => props.handlePageChange(1)}>
          <i className="fas fa-chevron-right" ></i>
        </button>

      </div>
    </>
  );
}

export default Pager;
