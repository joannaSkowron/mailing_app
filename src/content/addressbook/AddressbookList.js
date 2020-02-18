import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Search from '../../components/Search';
import Pager from '../../components/Pager';
import Spinner from '../../components/Spinner';
import AddressbookListTools from '../../components/AddressbookListTools';
import '../../styles/addressbook/AddressbookList.css';


class AddressbookList extends Component {

  state = {

    data: [
      {
        id: 1,
        isFavourite: true,
        name: 'Fake Contact Name Fake Contact Name Fake Contact Name Fake Contact Name Fake Contact Name',
        email: 'fake@contact.com fake@contact.com fake@contact.com fake@contact.comfake@contact.com',
        phone: '123456789fake@contact.comfake@contact.com fake@contact.comfake@contact.comfake@contact.com',
        notes: 'This is fake contact object.fake@contact.comfake@contact.comfake@contact.com'
      },
      {
        id: 2,
        isFavourite: false,
        name: 'Fake Contact Name 2',
        email: 'fake2@contact.com',
        phone: '123456789',
        notes: 'This is fake contact second object.'
      },
      {
        id: 3,
        isFavourite: true,
        name: 'Fake Contact Name !!!',
        email: 'fake55@contact.com',
        phone: '123456789',
        notes: 'This is fake contact third object.'
      },
    ]
  }

  handleFavourites = (id) => {
    console.log("love" + id)
  }

  // showToolbar = () => {
  //   console.log('bar show')
  // }

  // hideToolbar = () => {
  //   console.log('hide bar')
  // }

  renderTable() {
    const { data } = this.state;
    if (data === null) return;

    const addressbookTable = data.map(item => (
      <div className='addressbook-table-row' key={item.id}
      // onMouseEnter={this.showToolbar}
      // onMouseLeave={this.hideToolbar}
      >
        <div className="addressbook-table addressbook-table-checkbox">
          <div className="addressbook-table-cell">
            <input type="checkbox" name="" id="" />
          </div>
        </div>
        <div className="addressbook-table addressbook-table-favourite">
          <div className="addressbook-table-cell">
            <i className="far fa-heart" title="Add to favourites" onClick={() => { this.handleFavourites(item.id) }}></i>
          </div>
        </div>

        <NavLink to="/" >
          <div className='addressbook-table addressbook-table-name'>
            <div className="addressbook-table-cell">{item.name}</div>
          </div>
          <div className='addressbook-table addressbook-table-email'>
            <div className="addressbook-table-cell">{item.email}</div>
          </div>
          <div className='addressbook-table addressbook-table-phone'>
            <div className="addressbook-table-cell">{item.phone}</div>
          </div>
        </NavLink >

        <div className="addressbook-table addressbook-table-tools">
          <div className="addressbook-table-cell">
            <AddressbookListTools id={item.id} />
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
            pagesCount={2}
            currentPage={1}
            handlePageChange={this.handlePageChange}
          />}</div>
        </div>

        <div className='addressbook-table-container'>
          <div className='addressbook-table-header'>
            <div className="addressbook-table-header-item addressbook-table-header-name">Name</div>
            <div className="addressbook-table-header-item addressbook-table-header-email">E-mail</div>
            <div className="addressbook-table-header-item addressbook-table-header-phone">Phone</div>
          </div>
          {this.renderTable()}
          {/* {this.renderSpinner()} */}
        </div>

      </>
    );
  }
}

export default AddressbookList;