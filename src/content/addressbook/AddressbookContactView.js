import React, { Component } from 'react';
import AddressbookListTools from '../../components/AddressbookListTools';
import '../../styles/addressbook/AddressbookContactView.css';

class AddressbookContactView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        id: 1,
        isFavourite: true,
        name: 'Fake Contact Name',
        email: 'fake@contact.com',
        phone: '123456789fake',
        note: 'This is fake contact object. Presented for testing only. Fetch not included yet. This is fake contact object. Presented for testing only. Fetch not included yet. This is fake contact object. Presented for testing only. Fetch not included yet. This is fake contact object. Presented for testing only. Fetch not included yet. This is fake contact object. Presented for testing only. Fetch not included yet.',
        picture: null,
        // picture: 'https://cdn.pixabay.com/photo/2016/03/26/19/15/iceland-1281141_1280.jpg',
        address: 'Branickiego 18',
        city: 'Warszawa',
        postalCode: '02-972',
        country: 'Poland',
      },
    }
  }


  renderContactContent = () => {
    const { data } = this.state;
    if (data === null) return;

    const src = encodeURI(`https://maps.google.com/maps?width=100%&height=600&hl=en&q=${data.address}, ${data.city}, ${data.country}&ie=UTF8&t=&amp;z=14&iwloc=B&output=embed`);

    const contactContent = (
      <div className="addressbook-contact-container">

        <div className="addressbook-contact-tools-container">
          <AddressbookListTools />
        </div>

        <h1 className="addressbook-contact-name">{data.name}</h1>
        <div className="addressbook-contact-data-container">

          <div className="addressbook-contact-data-item addressbook-contact-data-picture">
            <div className="addressbook-contact-data-picture-container">
              {data.picture
                ? <img src={data.picture} alt="Contact" />
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
              <p className="note">{data.note}</p>
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
              <p>{data.address}</p>
              <p>{data.city}</p>
              <p>{data.postalCode}</p>
              <p>{data.country}</p>
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
    return (
      <>

        {this.renderContactContent()}

      </>
    );
  }
}

export default AddressbookContactView;
