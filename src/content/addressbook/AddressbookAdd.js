import React, { Component } from 'react';
import AddressbookMap from './AddressbookMap';
import '../../styles/addressbook/AddressbookAdd.css';
import { Link, Prompt } from 'react-router-dom';
import { FetchService } from '../../services/FetchService';
import {
  Validator,
  ValidationConfig,
  validateRequired,
  useValidateMaxLenght,
} from '../../tools/Validator';
import avatar1 from '../../images/avatar1.png';
import FormInputErrMsg from '../../components/FormInputErrMsg';



class AddressbookAdd extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: null,
      avatar: null,
      name: '',
      email: '',
      phone: '',
      note: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Poland',
      mapActive: false,
      validationResult: null,
    };

    this.fetchSevice = new FetchService();
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
      validationResult: null,
    })
  }

  handleClick = (event, clickedItem) => {
    event.preventDefault();
    this.setState((state) => ({
      [clickedItem]: !state[clickedItem]
    }))
  }

  handleSave = (event) => {
    event.preventDefault();
    console.log('save')
    const { id, name, email, phone, note, address, city, postalCode, country } = this.state;
    const dataJSON = JSON.stringify({
      name,
      email,
      phone,
      note,
      address,
      city,
      postalCode,
      country
    })

    const validationConfigs = [
      new ValidationConfig('name', [validateRequired, useValidateMaxLenght(50)]),
      new ValidationConfig('email', [validateRequired, useValidateMaxLenght(50)]),
    ];

    const validationResult = new Validator(validationConfigs).validate(this.state);
    this.setState({
      validationResult
    });

    if (validationResult.isValid) {
      const API = id ? `/api/addressbook/${id}` : `/api/addressbook`;
      const options = {
        method: id ? 'put' : 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: dataJSON,
      };

      const successCallback = () => {
        console.log('sukces')
      };

      const failureCallback = (err) => {
        console.log('Request failed', err);
        alert("Sorry, your request to save failed")
      };

      this.fetchService.useFetch(API, options, successCallback, failureCallback);
    }
  };

  getValidationError = (fieldName) => {
    if (this.state.validationResult) {
      return this.state.validationResult.getErrorMessage(fieldName);
    }
  };

  // getAvatar = () => {
  //   if (this.state.avatar) 
  // };

  render() {
    const nameErrMsg = this.getValidationError('name');
    const emailErrMsg = this.getValidationError('email');

    return (
      <>

        <div className="addressbook-add-container">

          <div className="addressbook-add-header">
            <h1 className='addressbook-add-header-name'>New contact</h1>
            <img src={avatar1} alt='avatar' className='addressbook-add-header-avatar'></img>
          </div>

          <form className="addressbook-add-form">

            <label htmlFor="name">Contact name:<span>*</span></label>
            <input type="text"
              name="name"
              maxLength="50"
              onChange={this.onChange}
              value={this.state.name} />
            {nameErrMsg && <FormInputErrMsg errMsg={nameErrMsg} />}

            <label htmlFor="email">Email adress:<span>*</span></label>
            <input type="text"
              name="email"
              maxLength="50"
              pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
              onChange={this.onChange}
              value={this.state.email} />
            {emailErrMsg && <FormInputErrMsg errMsg={emailErrMsg} />}

            <label htmlFor="phone">Phone number:</label>
            <input type="text"
              name="phone"
              maxLength="50"
              onChange={this.onChange}
              value={this.state.phone} />

            <label htmlFor="note">Note:</label>
            <textarea
              name="note"
              maxLength="1000"
              onChange={this.onChange}
              value={this.state.note} />

            <label htmlFor="address">Address:</label>
            <input type="text"
              name="address"
              maxLength="100"
              autoComplete="new"
              onChange={this.onChange}
              value={this.state.address} />

            <div className='wrapper'>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                name="city"
                maxLength="50"
                autoComplete="false"
                onChange={this.onChange}
                value={this.state.city} />
            </div>

            <div className='wrapper'>
              <label htmlFor="postalcode">Postal code:</label>
              <input
                type="text"
                name="postalCode"
                maxLength="10"
                autoComplete="false1"
                onChange={this.onChange}
                value={this.state.postalCode} />
            </div>

            <div className="wrapper">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                name="country"
                maxLength="50"
                autoComplete="false2"
                onChange={this.onChange}
                value={this.state.country} />
            </div>

            <button type='button' className="open-map"
              onClick={(event) => this.handleClick(event, 'mapActive')}>
              <i className="fas fa-map-marker-alt"></i>
                  See location on GoogleMaps
                </button>

            <div className="addressbook-add-form-buttons">
              <button type='submit' className="save" onClick={(event) => this.handleSave(event)}>Save</button>
              <Prompt
                when={true}
                message={'Are you sure you want to cancel?'} />
              <Link to='/addressbook/all'>
                <button type='button' className="cancel" >Cancel</button>
              </Link>
            </div>

          </form>

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