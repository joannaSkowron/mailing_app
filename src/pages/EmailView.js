import React, { Component } from 'react';
import EmailViewTools from '../components/EmailViewTools';

import '../styles/EmailView.css';


class EmailView extends Component {

  state = {
    data: null,
  }

  fetchData() {
    const id = this.props.match.params.id;
    const API = `http://catmail.azurewebsites.net/api/emails/${id}`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response
        } throw Error('Error')
      })
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({
          data
        }));
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.fetchData();
  }

  renderEmailContent() {
    if (this.state.data === null) return;
    const { data } = this.state;

    const emailContent = (
      <>
        <div className="email-view-container">
          <EmailViewTools />

          <h1 className="email-view-title">{data.title}</h1>

          <header className="email-view-header">
            <div className="email-view-header-from">From: {data.from.address} ({data.from.address})</div>
            <div className="email-view-header-to">To: {data.to.map(item => item.address)}</div>
            <div className="email-view-header-date">Date: {new Date(data.date).toLocaleString()}</div>
          </header>

          <main className="email-view-main-container">
            <div className="email-view-main">{data.content}</div>
          </main>
        </div>
      </>
    );

    return emailContent;
  }


  render() {

    return (
      <>

        {this.renderEmailContent()}

      </>
    );
  }
}

export default EmailView;