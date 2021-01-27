import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/EmailViewTools.css';
import { FetchService } from '../services/FetchService';
import { toast } from 'react-toastify';


class EmailViewTools extends Component {

  constructor(props) {
    super(props);
    this.fetchService = new FetchService();
  }

  handleMoveToFolder = (folderName) => {
    const API = `/api/Emails/${this.props.data.id}/move/${folderName}`;
    const options = { method: 'put' };
    const successCallback = () => {
      this.props.handleDeletingOrMovingEmail();
      toast(`Email moved to ${folderName}`)
    };
    const failureCallback = (err) => {
      console.log('Failed to move email. ', err)
      toast.error('Failed to move email')
    };

    this.fetchService.useFetch(API, options, successCallback, failureCallback);
  }

  handleRestoreFromFolder = (folderName) => {
    const API = `/api/Emails/${this.props.data.id}/restore/${folderName}`;
    const options = { method: 'put' };
    const successCallback = () => {
      this.props.handleDeletingOrMovingEmail();
      toast('Email restored')
    };
    const failureCallback = (err) => {
      console.log('Failed to restore email. ', err);
      toast.error('Failed to restore email')
    };

    this.fetchService.useFetch(API, options, successCallback, failureCallback);
  }

  deleteEmail = () => {
    const API = `/api/Emails/${this.props.data.id}`;
    const options = { method: 'delete' }

    const successCallback = () => {
      this.props.handleDeletingOrMovingEmail();
      toast("Email deleted");
    };
    const failureCallback = (err) => {
      console.log('Failed to delete email. ', err);
      toast.error("Failed to delete email");
    };

    this.fetchService.useFetch(API, options, successCallback, failureCallback);
  }

  render() {
    const id = this.props.data.id;
    const currentFolder = this.props.currentFolder;

    const selectButtons = {
      reply: ['inbox', 'outbox', 'trash', 'spam'].includes(currentFolder) ? true : false,
      replyAll: ['inbox', 'outbox', 'trash', 'spam'].includes(currentFolder) ? true : false,
      forward: ['inbox', 'outbox', 'trash', 'spam'].includes(currentFolder) ? true : false,
      edit: ['draft'].includes(currentFolder) ? true : false,
      moveToSpam: ['inbox'].includes(currentFolder) ? true : false,
      moveToTrash: ['inbox', 'outbox', 'spam'].includes(currentFolder) ? true : false,
      restoreFromTrash: ['trash'].includes(currentFolder) ? true : false,
      restoreFromSpam: ['spam'].includes(currentFolder) ? true : false,
      deleteEmail: ['draft', 'trash'].includes(currentFolder) ? true : false,
    }

    return (
      <>
        <div className="email-view-tools-container">

          {selectButtons.reply && <Link to={`/email/compose/new?id=${id}&responsetype=reply`}>
            <div className="email-view-tools" title="Reply">
              <i className="fas fa-reply"></i>
            </div>
          </Link>}

          {selectButtons.replyAll && <Link to={`/email/compose/new?id=${id}&responsetype=replyall`}>
            <div className="email-view-tools" title="Reply to all">
              <i className="fas fa-reply-all"></i>
            </div>
          </Link>}

          {selectButtons.forward && <Link to={`/email/compose/new?id=${id}&responsetype=forward`}>
            <div className="email-view-tools" title="Forward">
              <i className="fas fa-share"></i>
            </div>
          </Link>}

          {selectButtons.edit && <Link to={`/email/compose/new?id=${id}&responsetype=edit`}>
            <div className="email-view-tools" title="Edit">
              <i className="far fa-edit"></i>
            </div>
          </Link>}

          {selectButtons.moveToSpam && <div
            className="email-view-tools"
            title="Move to spam"
            onClick={() => this.handleMoveToFolder('spam')}>
            <i className='fas fa-ban'></i>
          </div>}

          {selectButtons.restoreFromTrash && <div
            className="email-view-tools"
            title="Restore to original folder"
            onClick={() => this.handleRestoreFromFolder('trash')}>
            <i className="fas fa-trash-restore"></i>
          </div>}

          {selectButtons.restoreFromSpam && <div
            className="email-view-tools"
            title="Restore to Inbox"
            onClick={() => this.handleRestoreFromFolder('spam')}>
            <i className="fas fa-trash-restore"></i>
          </div>}

          {selectButtons.moveToTrash && <div
            className="email-view-tools"
            title="Move to trash"
            onClick={() => this.handleMoveToFolder('trash')}>
            <i className='far fa-trash-alt'></i>
          </div>}

          {selectButtons.deleteEmail && <div
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