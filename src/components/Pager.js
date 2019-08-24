import React, { Component } from 'react';
import '../styles/Pager.css';


class Pager extends Component {

  state = {}

  render() {
    return (
      <>
        <div className="pager-container">
          <p className="pager-location">page 1 of 1000</p>
          <button className="pager-btn"><i class="fas fa-chevron-left"></i></button>
          <button className="pager-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
      </>
    );
  }
}

export default Pager;