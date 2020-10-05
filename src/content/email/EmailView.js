import React, { Component } from 'react';
import EmailViewTools from '../../components/EmailViewTools';
import parse from 'html-react-parser';

import '../../styles/email/EmailView.css';


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

    const { data } = this.state;
    const currentFolder = this.props.match.params.folder;
    if (data === null) return;

    const emailContent = (
      <>
        <div className="email-view-container">

          <EmailViewTools
            data={data}
            reply={['inbox', 'outbox', 'bin', 'spam'].includes(currentFolder) ? true : false}
            replyAll={['inbox', 'outbox', 'bin', 'spam'].includes(currentFolder) ? true : false}
            forward={['inbox', 'outbox', 'bin', 'spam'].includes(currentFolder) ? true : false}
            edit={['draft'].includes(currentFolder) ? true : false}
            moveToInbox={['bin'].includes(currentFolder) ? true : false}
            moveToSpam={['inbox'].includes(currentFolder) ? true : false}
            moveToBin={true}
          />

          <h1 className="email-view-title">{data.title}</h1>

          <header className="email-view-header">
            <div className="email-view-header-from">From: {data.from.address}</div>
            <div className="email-view-header-to">To: {data.to.map(item => item.address)}</div>
            <div className="email-view-header-toCC">CC: {data.cc.map(obj => obj.address).join(', ')}</div>
            <div className="email-view-header-date">Date: {new Date(data.date).toLocaleString()}</div>
          </header>

          <main className="email-view-main-container">
            <div className="email-view-main">{parse(data.content)}</div>
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