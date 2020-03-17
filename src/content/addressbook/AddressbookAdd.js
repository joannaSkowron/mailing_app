import React, { Component } from 'react';
import AddressbookMap from './AddressbookMap';
import '../../styles/addressbook/AddressbookAdd.css';


class AddressbookAdd extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    note: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Poland',

    mapActive: false,

  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    })
  }

  handleClick = (event, clickedItem) => {
    event.preventDefault();
    this.setState((state) => ({
      [clickedItem]: !state[clickedItem]
    }))
  }

  render() {

    return (
      <>
        <div className="addressbook-add-container">
          <div className="addressbook-add-container-forms">

            <div className="addressbook-add-contact-data">
              <div className="addressbook-add-header">
                <p>Contact information</p>
              </div>
              <div className="addressbook-add-fieldnames">
                <p>Contact name: <span>*</span></p>
                <p>Email adress: <span>*</span></p>
                <p>Phone number:</p>
                <p>Note:</p>
              </div>

              <form className="addressbook-add-form">

                <input type="text"
                  name="name"
                  maxLength="50"
                  autoComplete="new"
                  onChange={this.onChange}
                  value={this.state.name} />

                <input type="text"
                  name="email"
                  maxLength="50"
                  pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                  autoComplete="off"
                  onChange={this.onChange}
                  value={this.state.email} />

                <input type="text"
                  name="phone"
                  maxLength="10"
                  autoComplete="false1"
                  onChange={this.onChange}
                  value={this.state.phone} />

                <textarea
                  name="note"
                  maxLength="600"
                  autoComplete="false2"
                  onChange={this.onChange}
                  value={this.state.note} />

              </form>
            </div>

            <div className="addressbook-add-address-data">
              <div className="addressbook-add-header">
                <p>Address information</p>
              </div>
              <div className="addressbook-add-fieldnames">
                <p>Address:</p>
                <p>City:</p>
                <p>Postal code:</p>
                <p>Country:</p>
              </div>

              <form className="addressbook-add-form">
                <input type="text"
                  name="address"
                  maxLength="50"
                  autoComplete="new"
                  onChange={this.onChange}
                  value={this.state.address} />

                <input type="text"
                  name="city"
                  maxLength="50"
                  autoComplete="false"
                  onChange={this.onChange}
                  value={this.state.city} />

                <input type="text"
                  name="postalCode"
                  maxLength="5"
                  autoComplete="false1"
                  onChange={this.onChange}
                  value={this.state.postalCode} />

                <input type="text"
                  name="country"
                  maxLength="50"
                  autoComplete="false2"
                  onChange={this.onChange}
                  value={this.state.country} />

                <button className="open-map"
                  onClick={(event) => this.handleClick(event, 'mapActive')}>
                  <i className="fas fa-map-marker-alt"></i>
                  See location on GoogleMaps
                </button>

              </form>
            </div>

            <div className="addressbook-add-upload-picture">
              <div className="addressbook-add-header">
                <p>Upload contact picture</p>
              </div>
              <form action="">
                <input type="file" />
              </form>
            </div>

          </div>
          <div className="addressbook-add-form-buttons">
            <button className="save">Save</button>
            <button className="cancel">Cancel</button>
          </div>

        </div>

        {this.state.mapActive ?
          <AddressbookMap
            handleClick={this.handleClick}
            address={this.state.address}
            city={this.state.city}
            country={this.state.country}
          />
          : null
        }

      </>
    );
  }
}

export default AddressbookAdd;