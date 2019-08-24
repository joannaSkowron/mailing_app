import React, { Component } from 'react';
import '../styles/Search.css';

class Search extends Component {
  state = {}
  render() {
    return (
      <>
        <div className="input-search-container">
          <input className="input-search" type="text" placeholder="search..." />
          <i class="fas fa-search"></i>
        </div>
      </>
    );
  }
}

export default Search;