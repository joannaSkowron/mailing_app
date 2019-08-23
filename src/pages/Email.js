import React, { Component } from 'react';
import '../styles/Page.css';



class Email extends Component {

  state = {
    data: null,
  };

  fetchData(folder) {
    const API = `http://catmail.azurewebsites.net/api/folders/${folder}/emails?skip=0&take=20`;

    fetch(API, {
      method: 'GET'
    })
      .then(response => {
        if (response.ok) {
          return response
        } throw Error('Error')
      })
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({
          data
        }))
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentWillReceiveProps(newProps) {
    const folder = newProps.match.params.folder;
    this.fetchData(folder);
    console.log("new props");
  }

  componentDidMount(props) {
    const folder = this.props.match.params.folder;
    this.fetchData(folder);
  }

  getItemsCount() {
    return this.state.data !== null ? this.state.data.itemsCount : null;
  }

  renderEmailsTable() {

    if (this.state.data === null) return;

    const { items } = this.state.data;

    const emails_table = items.map(item => (
      <tr key={item.id} className='emails-table-row'>
        <td className='emails-table-td emails-table-sender'>
          {item.from.address}
        </td>
        <td className='emails-table-td emails-table-title'>
          {item.title}
        </td>
        <td className='emails-table-td emails-table-body'>
          {item.content}
        </td>
        <td className='emails-table-td emails-table-date'>
          {item.date}
        </td>
      </tr>
    ));

    return emails_table;
  }

  render() {

    return (
      <>
        <table className='emails-table'>
          <tbody>
            <tr className='emails-table-header'>
              <th>From</th>
              <th>Title</th>
              <th>Content</th>
              <th>Received on</th>
            </tr>
            {this.renderEmailsTable()}
          </tbody>
        </table>
        {this.getItemsCount()}
      </>
    );
  }
}

export default Email;