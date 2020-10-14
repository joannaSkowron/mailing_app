import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Search from '../../components/Search';
import Pager from '../../components/Pager';
import DateSorting from '../../components/DateSorting';
import Spinner from '../../components/Spinner';
import parse from 'html-react-parser';
import EmailViewTools from '../../components/EmailViewTools';
import { FetchService } from '../../services/FetchService';
import { dateFormatter } from '../../tools/DateFormatter';
import '../../styles/email/EmailList.css';


class Email extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      skip: 0,
      take: 20,
      currentPage: 1,
      pagesCount: null,
      searchText: '',
      newestFirst: true,
      showSpinner: true,
    };

    this.fetchService = new FetchService();
  }

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

    const API = `/api/folders/${folder}/emails?skip=${skip}&take=${take}&searchText=${searchText}&newestFirst=${newestFirst}`;
    const options = { method: 'get' };

    const successCallback = (data) => {
      this.setState({
        data,
        showSpinner: false,
      });
      this.setPagesCount();
    };

    const failureCallback = (err) => {
      console.log('Fetch failure callback in component EmailList');
      console.log(err, err.name);
    };

    this.fetchService.useFetch(API, options, successCallback, failureCallback);
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

  renderSpinner() {
    if (this.state.showSpinner)
      return <Spinner />;
  }

  componentDidMount() {
    const folder = this.props.match.params.folder;
    const { skip, take, searchText, newestFirst } = this.state;
    this.fetchData(folder, skip, take, searchText, newestFirst);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.folder !== prevProps.match.params.folder) {
      this.setState({
        currentPage: 1,
      });
      const folder = this.props.match.params.folder;
      const { take, searchText, newestFirst } = this.state;
      this.fetchData(folder, 0, take, searchText, newestFirst);
    }
  }

  componentWillUnmount() {
    this.fetchService.abortFetch();
  }

  renderEmailsTable() {
    if (this.state.data === null) {
      console.log("State is null... cannot render table...")
      return;
    }

    const { items } = this.state.data;
    const currentFolder = this.props.match.params.folder;

    if (items.length === 0) return `Nothing to see here, move along, sir.`;

    const emailsTable = items.map(item => (

      <div className='emails-table-row' key={item.id}>

        <NavLink to={`/email/viewemail/${currentFolder}/${item.id}`} >

          <div className='emails-table emails-table-from'>
            <div className="emails-table-cell">
              <p>
                {['outbox', 'draft'].includes(currentFolder) ?
                  item.to.map(item => `${item.address} `) : item.from.address}
              </p>
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
            <div className="emails-table-cell">{dateFormatter(new Date(item.date))}</div>
          </div>

        </NavLink>

        <div className="emails-table-item emails-table-tools">
          <div className="emails-table-cell">

            <EmailViewTools
              data={item}
              reply={['inbox', 'outbox', 'bin', 'spam'].includes(currentFolder) ? true : false}
              replyAll={['inbox', 'outbox', 'bin', 'spam'].includes(currentFolder) ? true : false}
              forward={['inbox', 'outbox', 'bin', 'spam'].includes(currentFolder) ? true : false}
              edit={['draft'].includes(currentFolder) ? true : false}
              moveToInbox={['bin'].includes(currentFolder) ? true : false}
              moveToSpam={['inbox'].includes(currentFolder) ? true : false}
              moveToBin={true}
            />

          </div>
        </div>
      </div>
    ));

    return emailsTable;
  }

  render() {

    console.log("Render...");

    const { pagesCount, currentPage } = this.state;
    const currentFolder = this.props.match.params.folder;

    return (
      <>
        <div className="tools-container">
          <div className="search">
            {<Search
              handleSearch={this.handleSearch}
            />}
          </div>
          <div className="pager">
            {<Pager
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
          <div className='emails-table-header-item emails-table-header-date'>Date
          {<DateSorting
              handleDateSorting={this.handleDateSorting}
            />}
          </div>
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