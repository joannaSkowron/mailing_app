import React, { Component } from 'react';
import '../styles/Pager.css';


class Pager extends Component {

  state = {}

  render() {
    return (
      <>
        <div className="pager-container">
          <p className="pager-location">page {this.props.currentPage} of {this.props.pagesCount}</p>
          <button className="pager-btn" onClick={() => this.props.handlePageChange(-1)}><i class="fas fa-chevron-left" ></i></button>
          <button className="pager-btn" onClick={() => this.props.handlePageChange(1)}><i class="fas fa-chevron-right" ></i></button>
        </div>
      </>
    );
  }
}

export default Pager;