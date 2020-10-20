import React, { Component } from 'react';
import EmailViewTools from '../../components/EmailViewTools';
import { FetchService } from '../../services/FetchService';
import parse from 'html-react-parser';

import '../../styles/email/EmailView.css';
import { Redirect } from 'react-router-dom';


class EmailView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      redirectToFolder: false,
    }

    this.fetchService = new FetchService();
  }

  handleDeletingEmail = () => {
    const folder = this.props.match.params.folder;
    this.setState({
      redirectToFolder: folder,
    })
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const API = `/api/emails/${id}`;
    const options = { method: 'get' };
    const successCallback = (data) => {
      this.setState({ data });
    }
    const failureCallback = (err) => {
      console.log(err)
    };

    this.fetchService.useFetch(API, options, successCallback, failureCallback);
  }

  componentWillUnmount() {
    this.fetchService.abortFetch();
  }

  renderEmailContent() {
    const { data } = this.state;
    if (data === null) return;

    const currentFolder = this.props.match.params.folder;

    const emailContent = (
      <>
        <div className="email-view-container">

          <EmailViewTools
            data={data}
            handleDeletingEmail={this.handleDeletingEmail}
            currentFolder={currentFolder}
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

    if (this.state.redirectToFolder) {
      return <Redirect to={`/email/${this.state.redirectToFolder}`} />;
    }

    return (
      <>
        {this.renderEmailContent()}
      </>
    );
  }
}

export default EmailView;