import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/EmailViewTools.css';
import { FetchService } from '../services/FetchService';


class EmailViewTools extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.fetchService = new FetchService();
  }

  handleMoveToFolder = (folderName) => {
    console.log(`Move to folder: ${folderName}`);

  }

  deleteEmail = () => {
    const API = `/api/Emails/${this.props.data.id}`;
    const options = { method: 'delete' }
    const successCallback = () => {
      this.props.handleDeletingEmail();
    };
    const failureCallback = (err) => {
      console.log('Failed to delete email. ', err);
    };

    this.fetchService.useFetch(API, options, successCallback, failureCallback);
  }

  restoreEmail = () => {
    console.log(`Restore to original folder`);
  }

  render() {
    const id = this.props.data.id;
    const { reply, replyAll, forward, edit, moveToInbox, moveToSpam, moveToTrash, deleteEmail, restoreEmail } = this.props;

    return (
      <>
        <div className="email-view-tools-container">

          {reply && <Link to={`/email/compose/new?id=${id}&responsetype=reply`}>
            <div className="email-view-tools" title="Reply">
              <i className="fas fa-reply"></i>
            </div>
          </Link>}

          {replyAll && <Link to={`/email/compose/new?id=${id}&responsetype=replyall`}>
            <div className="email-view-tools" title="Reply to all">
              <i className="fas fa-reply-all"></i>
            </div>
          </Link>}

          {forward && <Link to={`/email/compose/new?id=${id}&responsetype=forward`}>
            <div className="email-view-tools" title="Forward">
              <i className="fas fa-share"></i>
            </div>
          </Link>}

          {edit && <Link to={`/email/compose/new?id=${id}&responsetype=edit`}>
            <div className="email-view-tools" title="Edit">
              <i className="far fa-edit"></i>
            </div>
          </Link>}

          {moveToInbox && <div
            className="email-view-tools"
            title="Move to inbox"
            name="inbox"
            onClick={() => this.handleMoveToFolder('inbox')}>
            <i className='far fa-envelope-open'></i>
          </div>}

          {moveToSpam && <div
            className="email-view-tools"
            title="Move to spam"
            onClick={() => this.handleMoveToFolder('spam')}>
            <i className='fas fa-ban'></i>
          </div>}

          {moveToTrash && <div
            className="email-view-tools"
            title="Move to trash"
            onClick={() => this.handleMoveToFolder('trash')}>
            <i className='far fa-trash-alt'></i>
          </div>}

          {restoreEmail && <div
            className="email-view-tools"
            title="Restore to original folder"
            onClick={this.deleteEmail}>
            <i className="fas fa-trash-restore"></i>
          </div>}

          {deleteEmail && <div
            className="email-view-tools"
            title="Delete"
            onClick={this.deleteEmail}>
            <i className="far fa-times-circle"></i>
          </div>}

        </div>
      </>
    );
  }
}


export default EmailViewTools;