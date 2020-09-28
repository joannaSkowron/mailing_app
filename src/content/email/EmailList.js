import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Search from '../../components/Search';
import Pager from '../../components/Pager';
import DateSorting from '../../components/DateSorting';
import Spinner from '../../components/Spinner';
import parse from 'html-react-parser';
import '../../styles/email/EmailList.css';


class Email extends Component {

  state = {
    data: null,
    skip: 0,
    take: 20,
    currentPage: 1,
    pagesCount: null,
    searchText: '',
    newestFirst: true,
    showSpinner: true,
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

    this.setState({
      showSpinner: true,
    });

    const API = `http://catmail.azurewebsites.net/api/folders/${folder}/emails?skip=${skip}&take=${take}&searchText=${searchText}&newestFirst=${newestFirst}`;
    fetch(API)
      .then(response => {
        if (response.ok) {
          return response
        } throw Error('Error') //użycie throw spowoduje, że nowa obietnica uzyska stan rejected, wywoła się metoda catch
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          data,
          showSpinner: false,
        });
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
    this.setState({
      currentPage: 1,
    });
    const folder = newProps.match.params.folder;
    const { take, searchText, newestFirst } = this.state;
    this.fetchData(folder, 0, take, searchText, newestFirst);
  }

  componentDidMount() {
    const folder = this.props.match.params.folder;
    const { skip, take, searchText, newestFirst } = this.state;
    this.fetchData(folder, skip, take, searchText, newestFirst);
  }


  getDate(date) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();

    const minutes = date.getMinutes();
    const hours = date.getHours();
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    let formattedDate = null;
    if (currentDate.getDate() === day && monthNames[currentDate.getMonth()] === month && currentDate.getFullYear() === year) {
      formattedDate = `${hours}:${minutes.toString().padStart(2, '0')}`
    } else if (currentDate.getFullYear() === year) {
      formattedDate = `${day} ${month}`
    } else if (currentDate.getFullYear() !== year) {
      formattedDate = `${day}/${month}/${year}`
    };

    return formattedDate;
  }

  renderSpinner() {
    if (this.state.showSpinner)
      return <Spinner />;
  }

  renderEmailsTable() {
    if (this.state.data === null) return;

    const { items } = this.state.data;
    const currentFolder = this.props.match.params.folder;

    if (items.length === 0) return `Nothing to see here, move along, sir.`;

    const emails_table = items.map(item => (

      <NavLink to={`/email/viewemail/${currentFolder}/${item.id}`} key={item.id} >
        <div className='emails-table-row'>
          <div className='emails-table emails-table-from'>
            <div className="emails-table-cell">
              <p>
                {['outbox', 'draft'].includes(currentFolder) ?
                  item.to.map(item => `${item.address} `) : item.from.address}
              </p>
              {/* <p className='emails-table-from-adress'>
                {['outbox', 'draft'].includes(currentFolder) ? '' : item.from.address}
              </p> */}
            </div>
          </div>
          <div className='emails-table emails-table-title'>
            <div className="emails-table-cell">{item.title}</div>
          </div>
          <div className='emails-table emails-table-content'>
            {/* NIE DZIAŁA INNERTEXT DLA PONIŻSZEGO: */}
            <div className="emails-table-cell">{parse(item.content)}</div>
          </div>
          <div className='emails-table emails-table-date'>
            <div className="emails-table-cell">{this.getDate(new Date(item.date))}</div>
          </div>
        </div>
      </NavLink>
    ));
    return emails_table;
  }

  render() {

    const { pagesCount, currentPage } = this.state;
    const currentFolder = this.props.match.params.folder;

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


        <div className='emails-table-header'>
          <div className="emails-table-header-item emails-table-header-from">
            {['outbox', 'draft'].includes(currentFolder) ? 'To' : 'From'}
          </div>

          <div className="emails-table-header-item emails-table-header-title">Title</div>
          <div className="emails-table-header-item emails-table-header-content">Content</div>
          <div className='emails-table-header-item emails-table-header-date'>Date {<DateSorting
            handleDateSorting={this.handleDateSorting}
          />}</div>
        </div>

        <div className='emails-table-container'>
          {this.renderEmailsTable()}
          {this.renderSpinner()}
        </div>
      </>
    );
  }
}

export default Email;