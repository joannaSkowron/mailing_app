import React, { Component } from 'react';
import '../styles/components/Search.css';

class Search extends Component {
  state = {
    searchText: ''
  }

  onInput = (event) => {
    this.setState({
      searchText: event.target.value
    })
  }

  onKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.props.handleSearch(event.target.value);
    }
  }

  onClick = () => {
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
            onChange={event => this.onInput(event)}
            onKeyUp={event => this.onKeyUp(event)}
          />
          {this.clearInput()}
          <i className="fas fa-search" title='Search' onClick={() => this.onClick()}></i>
        </div>
      </>
    );
  }
}

export default Search;