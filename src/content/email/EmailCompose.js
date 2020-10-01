import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Link, Prompt, Redirect } from 'react-router-dom';
import '../../styles/email/EmailCompose.css';


class EmailCompose extends Component {
  state = {
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

  errorMessages = {
    addressIncorrect: 'Please enter a valid e-mail address.',
    subjectIncorrect: 'Please enter subject.',
    contentIncorrect: 'Please enter content.',
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

      const { address, addressCC, addressBCC, subject, content } = this.state;

      const data = {
        title: subject,
        content: content,
        from: "sender@catmail.test.com.pl",
        to: address.split(', '),
        cc: addressCC.split(', '),
        bcc: addressBCC.split(', ')
      };
      const dataJSON = JSON.stringify(data);

      const API = `https://catmail.azurewebsites.net/api/emails/send`;

      fetch(API, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: dataJSON,
      })
        .then(response => {
          if (response.ok) {
            this.setState({
              redirectToInbox: true,
            })
          } else { throw Error('Error') }
        })
        .catch(error => {
          console.log('Request failed', error);
          alert("Sorry, your request to send this e-mail failed")
        });
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
    const { address, addressCC, addressBCC, subject, content } = this.state;

    const data = {
      title: subject,
      content: content,
      from: "sender@catmail.test.com.pl",
      to: address.split(', '),
      cc: addressCC.split(', '),
      bcc: addressBCC.split(', ')
    };
    const dataJSON = JSON.stringify(data);

    const API = `https://catmail.azurewebsites.net/api/emails/draft`;

    fetch(API, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: dataJSON,
    })
      .then(response => {
        if (response.ok) {
          this.setState({
            redirectToDrafts: true,
          })
          alert('Saved as draft')
        } else { throw Error('Error') }
      })
      .catch(error => {
        console.log('Request failed', error);
        alert("Sorry, your request to save as draft failed")
      });
  }


  fetchData(id) {
    const API = `https://catmail.azurewebsites.net/api/emails/${id}`;
    const data = fetch(API)
      .then(response => {
        if (response.ok) {
          return response
        } throw Error('Error')
      })
      .then(response => response.json())
      .catch(err => {
        console.log(err)
      });
    return data;
  }

  componentDidMount() {

    const query = new URLSearchParams(this.props.location.search);

    if (query.get('id')) {
      this.fetchData(query.get("id")).then(data => {

        const subject = data.title;
        const subjectRE = `RE: ${data.title}`;
        const subjectFWD = `FWD: ${data.title}`;
        const address = data.from.address;
        const addressTO = data.to.map(obj => obj.address).join(', ');
        const addressCC = data.cc.map(obj => obj.address).join(', ');
        const addressBCC = data.bcc.map(obj => obj.address).join(', ');
        const content = `<br><br>
      <hr>
      From: ${address}<br>
      CC: ${addressCC}<br>
      Received: ${new Date(data.date).toLocaleString()}<br><br>

      ${data.content}`;


        if (query.get("responsetype") === 'reply') {
          this.setState({
            address,
            subject: subjectRE,
            content,
          })
        } else if (query.get("responsetype") === 'replyall') {
          this.setState({
            address,
            addressCC,
            subject: subjectRE,
            content,
          })
        } else if (query.get("responsetype") === 'forward') {
          this.setState({
            subject: subjectFWD,
            content,
          })
        } else if (query.get("responsetype") === 'edit') {
          this.setState({
            address: addressTO,
            addressCC,
            addressBCC,
            subject,
            content: data.content,
          })
        }
      })
    }
  }

  render() {

    if (this.state.redirectToDrafts) {
      return <Redirect to='/email/draft' />
    }

    if (this.state.redirectToInbox) {
      return <Redirect to='/email/inbox' />
    }

    return (
      <>
        <div className="email-compose-container">

          <form className="email-compose-form">
            <div className="email-compose-form-header">
              <input type="text"
                name="address"
                placeholder="To"
                autoComplete="false1"
                onChange={this.handleChange}
                value={this.state.address}
              />
              {this.state.errors.address &&
                <span className="email-compose-error-message">{this.errorMessages.addressIncorrect}</span>}
              <input type="text"
                name="addressCC"
                placeholder="CC"
                autoComplete='false2'
                onChange={this.handleChange}
                value={this.state.addressCC}
              />
              {this.state.errors.addressCC &&
                <span className="email-compose-error-message">{this.errorMessages.addressIncorrect}</span>}
              <input type="text"
                name="addressBCC"
                placeholder="BCC"
                autoComplete='false3'
                onChange={this.handleChange}
                value={this.state.addressBCC}
              />
              {this.state.errors.addressBCC &&
                <span className="email-compose-error-message">{this.errorMessages.addressIncorrect}</span>}
              <input type="text"
                name="subject"
                placeholder="Subject"
                autoComplete='false4'
                onChange={this.handleChange}
                value={this.state.subject}
              />
              {this.state.errors.subject &&
                <span className="email-compose-error-message">{this.errorMessages.subjectIncorrect}</span>}
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
              {this.state.errors.content &&
                <span className="email-compose-error-message">{this.errorMessages.contentIncorrect}</span>}
              {/* <textarea name="content"
                onChange={this.handleChange}
                value={this.state.content}>
                <Editor
                  apiKey="bjuvt5iln6j3ymf2uwsfx02kslovxyhomp0nnkbgm47yvtbl"
                  init={{ plugins: 'link table' }} />
              </textarea> */}
            </div>
            <div className="email-compose-form-buttons">
              <button className="email-compose-btn" onClick={this.handleSend}>Send</button>
              <button className="email-compose-btn" onClick={this.handleSaveAsDraft}>Save as draft</button>
              <Prompt
                when={true}
                message={'Are you sure you want to cancel?'}
              />
              <Link to='/email/inbox'>
                <button className="email-compose-btn">Cancel</button>
              </Link>

            </div>
          </form>

        </div>
      </>
    );
  }
}

export default EmailCompose;