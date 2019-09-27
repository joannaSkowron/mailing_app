import React, { Component } from 'react';
import '../styles/components/Pager.css';


class Pager extends Component {

  state = {}

  render() {
    return (
      <>
        <div className="pager-container">
          <p className="pager-location">page {this.props.currentPage} of {this.props.pagesCount}</p>
          <button className="pager-btn" title='Previous' onClick={() => this.props.handlePageChange(-1)}><i className="fas fa-chevron-left" ></i></button>
          <button className="pager-btn" title='Next' onClick={() => this.props.handlePageChange(1)}><i className="fas fa-chevron-right" ></i></button>
        </div>
      </>
    );
  }
}

export default Pager;