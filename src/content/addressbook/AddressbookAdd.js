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
import FormInputErrMsg from '../../components/FormInputErrMsg';
import AddressbookAddTools from '../../components/AddressbookAddTools';
import { COUNTRIES } from '../../constants/Countries';
import { BASE_URL } from '../../constants/URL';
import Spinner from '../../components/Spinner';


class AddressbookAdd extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: null,
      isFavourite: false,
      category: 'All',
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
      showSpinner: false,
    };

    this.fetchService = new FetchService();
  }

  handleChange = (event) => {
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

  toggleIsFavourite = () => {
    this.setState(prevState => ({
      isFavourite: !prevState.isFavourite,
    }))
  };

  setCategory = (category) => {
    this.setState({
      category,
    })
  };

  generateCountrySelectorOptions = () => {
    return COUNTRIES.map(country => {
      return (
        <option value={country} key={country}>{country}</option>
      )
    })
  };

  handleAvatarUpload = (event) => {
    this.setState({ showSpinner: true });

    let formData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name)
    const API = '/api/Avatar';
    const options = {
      method: 'post',
      body: formData
    };

    const successCallback = (data) => {
      this.setState({
        avatar: data.id,
        showSpinner: false,
      });
    };

    const failureCallback = (err) => {
      alert('Saving image file failed. Try again');
      console.log(`Saving image failed. ${err}`)
    };

    this.fetchService.useFetch(API, options, successCallback, failureCallback);
  };

  handleAvatarInputReset = (event) => {
    event.target.value = null;
  };

  renderAvatarInput = () => {
    if (this.state.avatar === null) {
      return (
        <>
          <div className="addressbook-add-avatar" title="Upload avatar image">
            <input
              type="file"
              accept="image/*"
              id="addressbook-add-avatar-input"
              hidden
              onChange={this.handleAvatarUpload}
            />
            <label htmlFor="addressbook-add-avatar-input" className="addressbook-add-avatar-input"></label>
            <i className="far fa-user"></i>
            <p>Upload image</p>

          </div>
        </>
      )
    } else {
      const imgURL = `${BASE_URL}/api/Avatar/${this.state.avatar}`;

      return (
        <div className="addressbook-add-avatar" title="Change avatar image" >
          <input type="file" id="addressbook-add-avatar-input" hidden
            onClick={this.handleAvatarInputReset}
            onChange={this.handleAvatarUpload} />
          <label htmlFor="addressbook-add-avatar-input" className="addressbook-add-avatar-input"></label>
          <img src={imgURL} alt="avatar" className="addressbook-add-avatar-image" />
        </div>
      )
    }
  };

  render() {
    const nameErrMsg = this.getValidationError('name');
    const emailErrMsg = this.getValidationError('email');

    return (
      <>

        <div className="addressbook-add-container">

          <div className="addressbook-add-header">
            <AddressbookAddTools
              isFavourite={this.state.isFavourite}
              category={this.state.category}
              toggleIsFavourite={this.toggleIsFavourite}
              setCategory={this.setCategory}
            />

          </div>

          <form className="addressbook-add-form">
            <div className="addressbook-add-form-container">

              <div className="addressbook-input-wrapper-avatar">

                <div className="addressbook-input-wrapper-basic">
                  <label htmlFor="name" className="addressbook-add-form-label">Contact name:<span>*</span></label>
                  <input type="text"
                    name="name"
                    maxLength="50"
                    onChange={this.handleChange}
                    value={this.state.name} />
                  {nameErrMsg && <FormInputErrMsg errMsg={nameErrMsg} />}

                  <label htmlFor="email" className="addressbook-add-form-label">Email adress:<span>*</span></label>
                  <input type="text"
                    name="email"
                    maxLength="50"
                    pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                    onChange={this.handleChange}
                    value={this.state.email} />
                  {emailErrMsg && <FormInputErrMsg errMsg={emailErrMsg} />}

                  <label htmlFor="phone" className="addressbook-add-form-label">Phone number:</label>
                  <input type="text"
                    name="phone"
                    maxLength="50"
                    onChange={this.handleChange}
                    value={this.state.phone} />
                </div>

                <div className="addressbook-add-avatar-container">
                  {this.renderAvatarInput()}

                </div>

              </div>

              <label htmlFor="note" className="addressbook-add-form-label">Note:</label>
              <textarea
                name="note"
                maxLength="1000"
                onChange={this.handleChange}
                value={this.state.note} />

              <label htmlFor="address" className="addressbook-add-form-label">Address:</label>
              <input type="text"
                name="address"
                maxLength="100"
                autoComplete="new"
                onChange={this.handleChange}
                value={this.state.address} />

              <div className='addressbook-input-wrapper-address'>
                <label htmlFor="city" className="addressbook-add-form-label">City:</label>
                <input
                  type="text"
                  name="city"
                  maxLength="50"
                  autoComplete="false"
                  onChange={this.handleChange}
                  value={this.state.city} />
              </div>

              <div className='addressbook-input-wrapper-address'>
                <label htmlFor="postalcode" className="addressbook-add-form-label">Postal code:</label>
                <input
                  type="text"
                  name="postalCode"
                  maxLength="10"
                  autoComplete="false1"
                  onChange={this.handleChange}
                  value={this.state.postalCode} />
              </div>

              <div className="addressbook-input-wrapper-address">
                <label htmlFor="country" className="addressbook-add-form-label">Country:</label>
                <select
                  name="country"
                  maxLength="50"
                  autoComplete="false2"
                  onChange={this.handleChange}
                  value={this.state.country}>
                  {this.generateCountrySelectorOptions()}
                </select>
              </div>

              <button type='button' className="open-map"
                onClick={(event) => this.handleClick(event, 'mapActive')}>
                <i className="fas fa-map-marker-alt"></i>
                  See location on GoogleMaps
                </button>

              <div className="addressbook-add-form-buttons">
                <button type='submit' className="save" onClick={this.handleSave}>Save</button>
                <Prompt
                  when={true}
                  message={'Are you sure you want to cancel?'} />
                <Link to='/addressbook/all'>
                  <button type='button' className="cancel" >Cancel</button>
                </Link>
              </div>

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

        {this.state.showSpinner ? <Spinner /> : null}

      </>
    );
  }
}

export default AddressbookAdd;