import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Search from '../../components/Search';
import Pager from '../../components/Pager';
import Spinner from '../../components/Spinner';
import AddressbookListTools from '../../components/AddressbookListTools';
import '../../styles/addressbook/AddressbookList.css';
import avatar1 from '../../images/avatar1.png';
import avatar2 from '../../images/avatar2.png';
import avatar3 from '../../images/avatar3.png';
import avatar4 from '../../images/avatar4.png';
import avatar5 from '../../images/avatar5.png';
import avatar6 from '../../images/avatar6.png';


class AddressbookList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showSpinner: false,
      data: [
        {
          id: 1,
          avatar: avatar1,
          isFavourite: true,
          name: 'Fake Contact Name Fake Contact Name Fake Contact Name Fake Contact Name Fake Contact Name',
          email: 'fake@contact.com fake@contact.com fake@contact.com fake@contact.comfake@contact.com',
          phone: '123456789fake@contact.comfake@contact.com fake@contact.comfake@contact.comfake@contact.com',
          notes: 'This is fake contact object.fake@contact.comfake@contact.comfake@contact.com'
        },
        {
          id: 2,
          avatar: avatar2,
          isFavourite: false,
          name: 'Fake Contact Name 2',
          email: 'fake2@contact.com',
          phone: '123456789',
          notes: 'This is fake contact second object.'
        },
        {
          id: 3,
          avatar: avatar3,
          isFavourite: true,
          name: 'Fake Contact Name !!!',
          email: 'fake55@contact.com',
          phone: '123456789',
          notes: 'This is fake contact third object.'
        },
        {
          id: 4,
          avatar: avatar4,
          isFavourite: false,
          name: 'Fake Contact Name Fake Contact Name Fake Contact Name Fake Contact Name Fake Contact Name',
          email: 'fake@contact.com fake@contact.com fake@contact.com fake@contact.comfake@contact.com',
          phone: '123456789fake@contact.comfake@contact.com fake@contact.comfake@contact.comfake@contact.com',
          notes: 'This is fake contact object.fake@contact.comfake@contact.comfake@contact.com'
        },
        {
          id: 5,
          avatar: avatar5,
          isFavourite: false,
          name: 'Fake Contact Name 2',
          email: 'fake2@contact.com',
          phone: '123456789',
          notes: 'This is fake contact second object.'
        },
        {
          id: 6,
          avatar: avatar6,
          isFavourite: false,
          name: 'Fake Contact Name !!!',
          email: 'fake55@contact.com',
          phone: '123456789',
          notes: 'This is fake contact third object.'
        },
        {
          id: 7,
          avatar: null,
          isFavourite: false,
          name: 'Fake Contact Name Fake Contact Name Fake Contact Name Fake Contact Name Fake Contact Name',
          email: 'fake@contact.com fake@contact.com fake@contact.com fake@contact.comfake@contact.com',
          phone: '123456789fake@contact.comfake@contact.com fake@contact.comfake@contact.comfake@contact.com',
          notes: 'This is fake contact object.fake@contact.comfake@contact.comfake@contact.com'
        },
        {
          id: 8,
          avatar: null,
          isFavourite: false,
          name: 'Fake Contact Name 2',
          email: 'fake2@contact.com',
          phone: '123456789',
          notes: 'This is fake contact second object.'
        },
        {
          id: 9,
          avatar: null,
          isFavourite: true,
          name: 'Fake Contact Name !!!',
          email: 'fake55@contact.com',
          phone: '123456789',
          notes: 'This is fake contact third object.'
        },
        {
          id: 10,
          avatar: null,
          isFavourite: false,
          name: 'Fake Contact Name Fake Contact Name Fake Contact Name Fake Contact Name Fake Contact Name',
          email: 'fake@contact.com fake@contact.com fake@contact.com fake@contact.comfake@contact.com',
          phone: '123456789fake@contact.comfake@contact.com fake@contact.comfake@contact.comfake@contact.com',
          notes: 'This is fake contact object.fake@contact.comfake@contact.comfake@contact.com'
        },
        {
          id: 11,
          avatar: null,
          isFavourite: false,
          name: 'Fake Contact Name 2',
          email: 'fake2@contact.com',
          phone: '123456789',
          notes: 'This is fake contact second object.'
        },
        {
          id: 12,
          avatar: null,
          isFavourite: false,
          name: 'Fake Contact Name !!!',
          email: 'fake55@contact.com',
          phone: '123456789',
          notes: 'This is fake contact third object.'
        },
        {
          id: 13,
          avatar: null,
          isFavourite: false,
          name: 'Fake Contact Name Fake Contact Name Fake Contact Name Fake Contact Name Fake Contact Name',
          email: 'fake@contact.com fake@contact.com fake@contact.com fake@contact.comfake@contact.com',
          phone: '123456789fake@contact.comfake@contact.com fake@contact.comfake@contact.comfake@contact.com',
          notes: 'This is fake contact object.fake@contact.comfake@contact.comfake@contact.com'
        },
        {
          id: 14,
          avatar: null,
          isFavourite: false,
          name: 'Fake Contact Name 2',
          email: 'fake2@contact.com',
          phone: '123456789',
          notes: 'This is fake contact second object.'
        },
        {
          id: 15,
          avatar: null,
          isFavourite: false,
          name: 'Fake Contact Name !!!',
          email: 'fake55@contact.com',
          phone: '123456789',
          notes: 'This is fake contact third object.'
        },
      ]
    }
  }

  renderSpinner = () => {
    if (this.state.showSpinner) {
      return <Spinner />
    }
  }

  handleFavourites = (event, id) => {
    console.log("love" + id);
    console.log(event.target)
  }

  renderTable() {
    const currentFolder = this.props.match.params.folder;
    const { data } = this.state;

    if (data === null) return;

    const addressbookTable = data.map(item => (
      <div className='addressbook-table-row' key={item.id}>
        <div className="addressbook-table-item addressbook-table-avatar">
          <div className="addressbook-table-cell">
            {item.avatar ?
              <img src={item.avatar} alt="Contact avatar" />
              : <i className="fas fa-user-astronaut"></i>}
          </div>
        </div>
        <div className="addressbook-table-item addressbook-table-favourite">
          <div className="addressbook-table-cell">
            <i title={item.isFavourite ? "Remove from favourites" : "Add to favourites"}
              className={item.isFavourite ? "far fa-heart favourite" : "far fa-heart"}
              onClick={(event) => this.handleFavourites(event, item.id)}
            ></i>
          </div>
        </div>

        <NavLink to={`/addressbook/${currentFolder}/contactview/${item.id}`} >
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
          <div className="addressbook-table-inner-container">
            {this.renderTable()}
            {this.renderSpinner()}
          </div>

        </div>

      </>
    );
  }
}

export default AddressbookList;