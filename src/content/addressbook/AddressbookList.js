import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Search from '../../components/Search';
import Pager from '../../components/Pager';
import Spinner from '../../components/Spinner';
import AddressbookListTools from '../../components/AddressbookListTools';
import '../../styles/addressbook/AddressbookList.css';
import { FetchService } from '../../services/FetchService';
import { BASE_URL } from '../../constants/URL';


class AddressbookList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showSpinner: true,
      data: null,
      skip: 0,
      take: 20,
      currentPage: 1,
      pagesCount: null,
      searchText: '',
    };

    this.fetchService = new FetchService();
  }

  renderSpinner = () => {
    this.setState({
      showSpinner: true,
    })
  }

  handleFavourites = (id, index) => {
    const API = `/api/Contact/${id}/favourite`;
    const options = { method: 'put' };
    const successCallback = (newValue) => {
      const dataCopy = JSON.parse(JSON.stringify(this.state.data));
      dataCopy.items[index].isFavourite = newValue;
      this.setState({
        data: dataCopy,
      })
    };
    const failureCallback = (err) => {
      console.log(err, err.name)
    };

    this.fetchService.useFetch(API, options, successCallback, failureCallback);
  }

  handleSearch = (value) => {
    this.setState({
      searchText: value,
    });

    const { skip, take } = this.state;
    const category = this.props.match.params.category;
    this.fetchData(value, category, skip, take);
  }

  handlePageChange = (value) => {
    const { take, currentPage, pagesCount, searchText } = this.state;
    if (currentPage + value >= 1 && currentPage + value <= pagesCount) {
      const newCurrentPage = currentPage + value;
      const newSkip = (newCurrentPage - 1) * take;

      this.setState({
        currentPage: newCurrentPage,
        skip: newSkip,
      })

      const category = this.props.match.params.category;
      this.fetchData(searchText, category, newSkip, take);
    }
  }

  handleDeletingContact = () => {
    if (this.state.data.items.length === 1 && this.state.pagesCount > 1) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1,
      }))
    };

    const category = this.props.match.params.category;
    const { searchText, currentPage, take } = this.state;
    const newSkip = (currentPage - 1) * take;
    this.fetchData(searchText, category, newSkip, take);
  }

  fetchData(searchText, category, skip, take) {
    this.renderSpinner();
    const API = `/api/Contact?searchText=${searchText}&category=${category}&skip=${skip}&take=${take}`;
    const options = { method: 'get' };
    const successCallback = (data) => {
      const pagesCount = Math.ceil(data.itemsCount / take);
      this.setState({
        data,
        pagesCount,
        showSpinner: false,
      })
    };
    const failureCallback = (err) => {
      console.log('Fetch failure callback in component AddressbookList');
      console.log(err, err.name);
    };

    this.fetchService.useFetch(API, options, successCallback, failureCallback);
  }

  componentDidMount() {
    const { searchText, skip, take } = this.state;
    const category = this.props.match.params.category;
    this.fetchData(searchText, category, skip, take);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.setState({
        currentPage: 1,
      });
      const category = this.props.match.params.category;
      const { searchText, skip, take } = this.state;
      this.fetchData(searchText, category, skip, take);
    }
  }

  componentWillUnmount() {
    this.fetchService.abortFetch();
  }

  renderTable() {
    if (this.state.data === null) return;
    const currentCategory = this.props.match.params.category;
    const { items } = this.state.data;
    if (items.length === 0) return `This list is empty`;

    const addressbookTable = items.map((item, index) => (
      <div className='addressbook-table-row' key={item.id}>
        <div className="addressbook-table-item addressbook-table-avatar">
          <div className="addressbook-table-cell">
            {item.avatar ?
              <img src={`${BASE_URL}/api/Avatar/${item.avatar}`} alt="Contact avatar" />
              : <i className="fas fa-camera"></i>}
          </div>
        </div>
        <div className="addressbook-table-item addressbook-table-favourite">
          <div className="addressbook-table-cell">
            <i title={item.isFavourite ? "Remove from favourites" : "Add to favourites"}
              className={item.isFavourite ? "far fa-heart favourite" : "far fa-heart"}
              onClick={() => this.handleFavourites(item.id, index)}
            ></i>
          </div>
        </div>

        <NavLink to={`/addressbook/${currentCategory}/contactview/${item.id}`} >
          <div className='addressbook-table-item addressbook-table-name'>
            <div className="addressbook-table-cell">{item.name}</div>
          </div>
          <div className='addressbook-table-item addressbook-table-email'>
            <div className="addressbook-table-cell">{item.email}</div>
          </div>
          <div className='addressbook-table-item addressbook-table-phone'>
            <div className="addressbook-table-cell">{item.phone}</div>
          </div>
        </NavLink >

        <div className="addressbook-table-item addressbook-table-tools">
          <div className="addressbook-table-cell">
            <AddressbookListTools
              id={item.id}
              email={item.email}
              handleDeletingContact={this.handleDeletingContact} />
          </div>
        </div>

      </div>
    ))
    return addressbookTable;
  }

  render() {

    return (
      <>

        <div className="tools-container">
          <div className="search">{<Search
            handleSearch={this.handleSearch}
          />}</div>
          <div className="pager">{<Pager
            pagesCount={this.state.pagesCount}
            currentPage={this.state.currentPage}
            handlePageChange={this.handlePageChange}
          />}</div>
        </div>

        <div className='addressbook-table-container'>

          <div className='addressbook-table-header'>
            <div className="addressbook-table-header-item addressbook-table-header-name">Name</div>
            <div className="addressbook-table-header-item addressbook-table-header-email">E-mail</div>
            <div className="addressbook-table-header-item addressbook-table-header-phone">Phone</div>
          </div>
          <div className="addressbook-table-inner-container">
            {this.renderTable()}
            {this.state.showSpinner && <Spinner />}
          </div>

        </div>

      </>
    );
  }
}

export default AddressbookList;