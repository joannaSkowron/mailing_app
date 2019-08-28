import React, { Component } from 'react';
import Search from '../components/Search';
import Pager from '../components/Pager';
import DateSorting from '../components/DateSorting';
import '../styles/Page.css';



class Email extends Component {

  state = {
    data: null,
    skip: 0,
    take: 20,
    currentPage: 1,
    pagesCount: null,
    searchText: '',
    newestFirst: true,
  };

  setPagesCount() {
    if (this.state.data !== null) {
      const pagesCount = Math.ceil(this.state.data.itemsCount / this.state.take);
      this.setState({
        pagesCount,
      })
    }
  }

  fetchData(folder, skip, take, searchText, newestFirst) {
    const API = `http://catmail.azurewebsites.net/api/folders/${folder}/emails?skip=${skip}&take=${take}&searchText=${searchText}&newestFirst=${newestFirst}`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response
        } throw Error('Error')
      })
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({
          data
        }))

        this.setPagesCount();
      })
      .catch(err => {
        console.log(err)
      })
  }

  handlePageChange = (value) => {
    const { take, currentPage, pagesCount, searchText, newestFirst } = this.state;
    if (currentPage + value >= 1 && currentPage + value <= pagesCount) {
      const newCurrentPage = currentPage + value;
      const newSkip = (newCurrentPage - 1) * take;

      this.setState({
        currentPage: newCurrentPage,
        skip: newSkip,
      })

      const folder = this.props.match.params.folder;
      this.fetchData(folder, newSkip, take, searchText, newestFirst);
    }
  }

  handleSearch = (value) => {
    this.setState({
      searchText: value,
    });

    const folder = this.props.match.params.folder;
    const { skip, take, newestFirst } = this.state;
    this.fetchData(folder, skip, take, value, newestFirst);
  }

  handleDateSorting = (value) => {
    this.setState({
      newestFirst: value,
    });

    const folder = this.props.match.params.folder;
    const { skip, take, searchText } = this.state;
    this.fetchData(folder, skip, take, searchText, value);
  }

  componentWillReceiveProps(newProps) {
    const folder = newProps.match.params.folder;
    const { skip, take, searchText, newestFirst } = this.state;
    this.fetchData(folder, skip, take, searchText, newestFirst);
  }

  componentDidMount(props) {
    const folder = this.props.match.params.folder;
    const { skip, take, searchText, newestFirst } = this.state;
    this.fetchData(folder, skip, take, searchText, newestFirst);
  }


  renderEmailsTable() {

    if (this.state.data === null) return;

    const { items } = this.state.data;

    const emails_table = items.map(item => (
      <tr key={item.id} className='emails-table-row'>
        <td className='emails-table-sender'>
          <div className='emails-table-td'>{item.from.address}</div>
        </td>
        <td className='emails-table-title'>
          <div className='emails-table-td'>{item.title}</div>
        </td>
        <td className='emails-table-body'>
          <div className='emails-table-td'>{item.content}</div>
        </td>
        <td className='emails-table-date'>
          <div className='emails-table-td'>{new Date(item.date).toLocaleString()}</div>
        </td>
      </tr>
    ));

    return emails_table;
  }

  render() {

    const { pagesCount, currentPage } = this.state;

    return (
      <>
        <div className="tools-container">
          <div className="search">{<Search
            handleSearch={this.handleSearch}
          />}</div>
          <div className="pager">{<Pager
            pagesCount={pagesCount}
            currentPage={currentPage}
            handlePageChange={this.handlePageChange}
          />}</div>
        </div>

        <table className='emails-table'>
          <tbody>
            <tr className='emails-table-header'>
              <th>From</th>
              <th>Title</th>
              <th>Content</th>
              <th className='emails-table-header-date'>Received {<DateSorting
                handleDateSorting={this.handleDateSorting}
              />}</th>
            </tr>
            {this.renderEmailsTable()}
          </tbody>
        </table>
      </>
    );
  }
}

export default Email;