import React, { Component } from 'react';
import AddressbookListTools from '../../components/AddressbookListTools';
import Spinner from '../../components/Spinner';
import { FetchService } from '../../services/FetchService';
import { BASE_URL } from '../../constants/URL';
import { Redirect } from 'react-router-dom';
import '../../styles/addressbook/AddressbookContactView.css';

class AddressbookContactView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showSpinner: true,
      data: null,
      redirectToCategory: false,
    };

    this.fetchService = new FetchService();
  }

  handleDeletingContact = () => {
    const category = this.props.match.params.category;
    this.setState({
      redirectToCategory: category,
    })
  }

  fetchData = (id) => {
    const API = `/api/Contact/${id}`;
    const options = { method: 'get' };
    const successCallback = (data) => {
      this.setState({
        data,
        showSpinner: false,
      });
    };
    const failureCallback = (err) => {
      console.log(err, err.name)
    };

    this.fetchService.useFetch(API, options, successCallback, failureCallback);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.fetchData(id);
  }

  componentWillUnmount() {
    this.fetchService.abortFetch();
  }

  renderContactContent = () => {
    if (this.state.data === null) return;
    const { data } = this.state;


    const src = encodeURI(`https://maps.google.com/maps?width=100%&height=600&hl=en&q=${data.address.street}, ${data.address.city}, ${data.address.country}&ie=UTF8&t=&amp;z=14&iwloc=B&output=embed`);

    const contactContent = (
      <div className="addressbook-contact-container">

        <div className="addressbook-contact-tools-container">
          <AddressbookListTools
            id={data.id}
            email={data.email}
            handleDeletingContact={this.handleDeletingContact} />
        </div>

        <h1 className="addressbook-contact-name">{data.name}</h1>
        <div className="addressbook-contact-data-container">

          <div className="addressbook-contact-data-item addressbook-contact-data-picture">
            <div className="addressbook-contact-data-picture-container">
              {data.avatar
                ? <img src={`${BASE_URL}/api/Avatar/${data.avatar}`} alt="Contact" />
                : <i className="fas fa-camera"></i>
              }
            </div>
          </div>

          <div className="addressbook-contact-data-item addressbook-contact-data-info">
            <div className="addressbook-contact-data-header">
              <p>Contact information</p>
            </div>
            <div className="addressbook-contact-data-fieldnames">
              <p>Contact name:</p>
              <p>Email adress:</p>
              <p>Phone number:</p>
              <p>Note:</p>
            </div>
            <div className="addressbook-contact-data-fields">
              <p>{data.name}</p>
              <p>{data.email}</p>
              <p>{data.phone}</p>
              <p className="note">{data.notes}</p>
            </div>
          </div>

          <div className="addressbook-contact-data-item addressbook-contact-data-address">
            <div className="addressbook-contact-data-header">
              <p>Address information</p>
            </div>
            <div className="addressbook-contact-data-fieldnames">
              <p>Address:</p>
              <p>City:</p>
              <p>Postal code:</p>
              <p>Country:</p>
            </div>
            <div className="addressbook-contact-data-fields">
              <p>{data.address.street}</p>
              <p>{data.address.city}</p>
              <p>{data.address.postCode}</p>
              <p>{data.address.country}</p>
            </div>
          </div>

          <div className="addressbook-contact-data-item addressbook-contact-data-map">
            <div className="addressbook-contact-data-map-container">

              <iframe
                title="map"
                src={src}
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0">
              </iframe>

            </div>
          </div>

        </div>


      </div >
    )

    return contactContent;
  }

  render() {

    if (this.state.redirectToCategory) {
      return <Redirect to={`/addressbook/${this.state.redirectToCategory}`} />;
    }

    return (
      <>

        {this.renderContactContent()}
        {this.state.showSpinner && <Spinner />}

      </>
    );
  }
}

export default AddressbookContactView;
