import React, { Component } from 'react';
import '../styles/components/Search.css';

class Search extends Component {
  state = {
    searchText: ''
  }

  handleChange = (event) => {
    this.setState({
      searchText: event.target.value
    })
  }

  handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.props.handleSearch(event.target.value);
    }
  }

  handleClick = () => {
    this.props.handleSearch(this.state.searchText);
  }

  handleClearInput = () => {
    this.setState({
      searchText: '',
    });
    this.props.handleSearch('');
  }

  clearInput = () => {
    if (this.state.searchText !== '') {
      return <i className="fas fa-times" title='Clear search' onClick={this.handleClearInput}></i>
    }
  }

  render() {
    return (
      <>
        <div className="input-search-container">
          <input
            className="input-search"
            type="text"
            placeholder="search..."
            value={this.state.searchText}
            onChange={event => this.handleChange(event)}
            onKeyUp={event => this.handleKeyUp(event)}
          />
          {this.clearInput()}
          <i className="fas fa-search" title='Search' onClick={() => this.handleClick()}></i>
        </div>
      </>
    );
  }
}

export default Search;