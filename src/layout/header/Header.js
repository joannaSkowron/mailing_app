import React, { Component } from 'react';
import NotificationsBar from './NotificationsBar';
import PictureEditor from './PictureEditor';
import '../../styles/layout/header/Header.css';
import avatar1 from '../../images/avatar1.png';


class Header extends Component {

  constructor(props) {
    super(props);

    const localStorageHeaderPicture = JSON.parse(localStorage.getItem('headerPicture'));
    this.state = {
      pictureEditorActive: false,
      headerPicture: localStorageHeaderPicture ?? { backgroundImage: `url(${avatar1})` },
    }
  }

  handleClick = (clickedItem) => {
    this.setState((state) => ({
      [clickedItem]: !state[clickedItem]
    }))
  }

  handlePictureChange = (selectedPicture) => {
    this.setState({
      headerPicture: selectedPicture,
    });

    localStorage.setItem('headerPicture', JSON.stringify(selectedPicture));
    this.setState({
      pictureEditorActive: false,
    })
  }

  componentDidMount() {
    const localStorageHeaderPicture = localStorage.getItem('headerPicture');
    console.log(localStorageHeaderPicture)
    if (localStorageHeaderPicture) {
      this.setState({
        headerPicture: JSON.parse(localStorageHeaderPicture),
      })
    }
  }

  render() {
    return (
      <>

        <div className="header-container">
          <div className="header-logo">
            <p>Mailbox</p>
          </div>
          <div className="header-content">

            <NotificationsBar handleBackgroundChange={this.props.handleBackgroundChange} />

            <div className="header-picture"
              style={this.state.headerPicture}
              onClick={() => this.handleClick('pictureEditorActive')}
            ></div>
          </div>
        </div>

        {this.state.pictureEditorActive
          ? <PictureEditor
            handleClick={this.handleClick}
            handlePictureChange={this.handlePictureChange} />
          : null}

      </>

    );
  }
}

export default Header;