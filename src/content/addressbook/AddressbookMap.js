import React, { Component } from 'react';
import '../../styles/addressbook/AddressbookMap.css';


class AddressbookMap extends Component {
  state = {}

  render() {

    const src = encodeURI(`https://maps.google.com/maps?width=100%&height=600&hl=en&q=${this.props.address}, ${this.props.city}, ${this.props.country}&ie=UTF8&t=&amp;z=14&iwloc=B&output=embed`);

    return (
      <>

        <div className="addressbook-map-page-container"
          onClick={(event) => this.props.handleClick(event, 'mapActive')}>
        </div>

        <div className="addressbook-map-container">

          <div className="addressbook-map-close">
            <i className="far fa-times-circle" title="Close"
              onClick={(event) => this.props.handleClick(event, 'mapActive')}></i>
          </div>

          <iframe
            title="map"
            src={src}
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0">
          </iframe>

        </div>

      </>
    );
  }
}

export default AddressbookMap;