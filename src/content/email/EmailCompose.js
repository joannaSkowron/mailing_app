import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Link, Prompt, Redirect } from 'react-router-dom';
import { FetchService } from '../../services/FetchService';
import { emailResponseQuotationHelper, stateUpdateBasedOnResponseType } from '../../tools/EmailResponseHelper';
import '../../styles/email/EmailCompose.css';
import Button from '../../components/Button';
import FormInputErrMsg from '../../components/FormInputErrMsg';
import { toast } from 'react-toastify';


class EmailCompose extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      addressCC: '',
      addressBCC: '',
      subject: '',
      content: '',

      errors: {
        address: false,
        addressCC: false,
        addressBCC: false,
        subject: false,
        content: false,
      },

      redirectToDrafts: false,
      redirectToInbox: false,
    }

    this.validationErrorMessages = {
      addressIncorrect: 'Enter a valid e-mail address',
      subjectIncorrect: 'Subject is required',
      contentIncorrect: 'Content is required',
    }

    this.fetchService = new FetchService();
  }

  handleValidation = () => {

    let address = false;
    let addressCC = false;
    let addressBCC = false;
    let subject = false;
    let content = false;
    let correct = false;

    if (this.state.address.indexOf('@') !== -1) {
      address = true;
    }

    if (this.state.addressCC === '' || this.state.addressCC.indexOf('@') !== -1) {
      addressCC = true;
    }

    if (this.state.addressBCC === '' || this.state.addressBCC.indexOf('@') !== -1) {
      addressBCC = true;
    }

    if (this.state.subject.length > 0) {
      subject = true;
    }

    if (this.state.content.length > 0) {
      content = true;
    }

    if (address && addressCC && addressBCC && subject && content) {
      correct = true;
    }

    return ({
      address,
      addressCC,
      addressBCC,
      subject,
      content,
      correct,
    })
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    })

    this.setState({
      errors: {
        address: false,
        addressCC: false,
        addressBCC: false,
        subject: false,
        content: false,
      }
    })
  }

  handleEditorChange = (content) => {
    this.setState({ content });
  }

  createJSON = () => {
    const { address, addressCC, addressBCC, subject, content } = this.state;

    const data = {
      title: subject,
      content: content,
      from: "sender@catmail.test.com.pl",
      to: address.split(', '),
      cc: addressCC.split(', '),
      bcc: addressBCC.split(', ')
    };

    return JSON.stringify(data);
  }

  handleSend = (event) => {
    event.preventDefault();

    const validation = this.handleValidation();

    if (validation.correct) {
      this.setState({
        errors: {
          address: false,
          addressCC: false,
          addressBCC: false,
          subject: false,
          content: false,
        }
      })

      const API = `/api/emails/send`;
      const options = {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: this.createJSON(),
      };
      const successCallback = () => {
        this.setState({
          redirectToInbox: true,
        });
        toast('Email sent');
      }
      const failureCallback = (error) => {
        console.log('Request failed', error);
        toast.error('Failed to send email');
      }

      this.fetchService.useFetch(API, options, successCallback, failureCallback);
    }

    else {
      this.setState({
        errors: {
          address: !validation.address,
          addressCC: !validation.addressCC,
          addressBCC: !validation.addressBCC,
          subject: !validation.subject,
          content: !validation.content,
        }
      })
    }
  }

  handleSaveAsDraft = (event) => {
    event.preventDefault();

    const API = `/api/emails/draft`;
    const options = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: this.createJSON(),
    };
    const successCallback = () => {
      this.setState({
        redirectToDrafts: true,
      })
      toast('Saved as draft');
    };
    const failureCallback = (err) => {
      console.log('Request failed', err);
      toast.error('Failed to save as draft');
    };

    this.fetchService.useFetch(API, options, successCallback, failureCallback);
  }

  componentDidMount() {
    const id = new URLSearchParams(this.props.location.search).get('id');
    const responsetype = new URLSearchParams(this.props.location.search).get('responsetype');
    const address = new URLSearchParams(this.props.location.search).get('address');
    const API = `/api/emails/${id}`;
    const options = { method: 'get' };
    let emailResponseQuotation;

    const successCallback = (data) => {
      emailResponseQuotation = emailResponseQuotationHelper(data);
      this.setState(stateUpdateBasedOnResponseType(responsetype, emailResponseQuotation));
    };

    const failureCallback = (err) => {
      console.log(err)
    };

    if (id) {
      this.fetchService.useFetch(API, options, successCallback, failureCallback);
    };

    if (address) {
      this.setState({
        address,
      })
    }
  }

  componentWillUnmount() {
    this.fetchService.abortFetch();
  }

  render() {

    if (this.state.redirectToDrafts) {
      return <Redirect to='/email/draft' />
    }

    if (this.state.redirectToInbox) {
      return <Redirect to='/email/inbox' />
    }

    const { addressIncorrect, subjectIncorrect, contentIncorrect } = this.validationErrorMessages;

    return (
      <>
        <div className="email-compose-container">

          <form className="email-compose-form">
            <div className="email-compose-form-header">
              <input type="text"
                name="address"
                placeholder="To"
                autoComplete='false'
                onChange={this.handleChange}
                value={this.state.address}
              />
              {this.state.errors.address && <FormInputErrMsg errMsg={addressIncorrect} />}

              <input type="text"
                name="addressCC"
                placeholder="CC"
                autoComplete='false2'
                onChange={this.handleChange}
                value={this.state.addressCC}
              />
              {this.state.errors.addressCC && <FormInputErrMsg errMsg={addressIncorrect} />}

              <input type="text"
                name="addressBCC"
                placeholder="BCC"
                autoComplete='false3'
                onChange={this.handleChange}
                value={this.state.addressBCC}
              />
              {this.state.errors.addressBCC && <FormInputErrMsg errMsg={addressIncorrect} />}

              <input type="text"
                name="subject"
                placeholder="Subject"
                autoComplete='false4'
                onChange={this.handleChange}
                value={this.state.subject}
              />
              {this.state.errors.subject && <FormInputErrMsg errMsg={subjectIncorrect} />}

            </div>
            <div className="email-compose-form-content">
              <Editor
                apiKey="bjuvt5iln6j3ymf2uwsfx02kslovxyhomp0nnkbgm47yvtbl"
                init={{ plugins: 'link table' }}
                onEditorChange={this.handleEditorChange}
                textareaName="content"
                className="email-compose-form-editor"
                value={this.state.content}
              />
              {/* {this.state.errors.content &&
                <span className="email-compose-error-message">{this.validationErrorMessages.contentIncorrect}</span>} */}
              {this.state.errors.content && <FormInputErrMsg errMsg={contentIncorrect} />}
            </div>
            <div className="email-compose-form-buttons">

              <Button
                type='button'
                buttonStyle='primary'
                handleClick={this.handleSend}
                text='Send' />

              <Button
                type='button'
                buttonStyle='secondary'
                handleClick={this.handleSaveAsDraft}
                text='Save as draft' />

              <Prompt
                when={true}
                message={'Are you sure you want to cancel?'}
              />
              <Link to='/email/inbox'>
                <Button
                  type='button'
                  buttonStyle='secondary'
                  text='Cancel' />
              </Link>

            </div>
          </form>

        </div>
      </>
    );
  }
}

export default EmailCompose;