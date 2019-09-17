import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../styles/EmailCompose.css';


class EmailCompose extends Component {
  state = {
    address: '',
    addressCC: '',
    addressBCC: '',
    subject: '',
    content: '',
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    })
  }

  handleEditorChange = (content) => {
    this.setState({ content });
    console.log(this.state.content)
  }

  fetchData(id) {
    const API = `http://catmail.azurewebsites.net/api/emails/${id}`;
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

        const subject = `RE: ${data.title}`;
        const subjectFWD = `FWD: ${data.title}`;
        const content = `<br><br>
      <hr>
      From: ${data.from.address}<br>
      CC: ${data.cc}<br>
      Received: ${new Date(data.date).toLocaleString()}<br><br>

      ${data.content}
      `;
        const address = data.from.address;
        const addressCC = data.cc.join(' ,');

        if (query.get("responsetype") === 'reply') {
          this.setState({
            address,
            subject,
            content,
          })
        } else if (query.get("responsetype") === 'replyall') {
          this.setState({
            address,
            addressCC,
            subject,
            content,
          })
        } else if (query.get("responsetype") === 'forward') {
          this.setState({
            subject: subjectFWD,
            content,
          })
        }
      })
    }

  }

  render() {

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
              <input type="text"
                name="addressCC"
                placeholder="CC"
                autoComplete='false2'
                onChange={this.handleChange}
                value={this.state.addressCC}
              />
              <input type="text"
                name="addressBCC"
                placeholder="BCC"
                autoComplete='false3'
                onChange={this.handleChange}
                value={this.state.addressBCC}
              />
              <input type="text"
                name="subject"
                placeholder="Subject"
                autoComplete='false4'
                onChange={this.handleChange}
                value={this.state.subject}
              />
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
              {/* <textarea name="content"
                onChange={this.handleChange}
                value={this.state.content}>
                <Editor
                  apiKey="bjuvt5iln6j3ymf2uwsfx02kslovxyhomp0nnkbgm47yvtbl"
                  init={{ plugins: 'link table' }} />
              </textarea> */}
            </div>
            <div className="email-compose-form-buttons">
              <button className="email-compose-btn">Send</button>
              <button className="email-compose-btn">Save as draft</button>
              <button className="email-compose-btn">Cancel</button>
            </div>
          </form>

        </div>
      </>
    );
  }
}

export default EmailCompose;