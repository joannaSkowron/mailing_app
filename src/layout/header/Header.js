import React, { Component } from 'react';
import NotificationsBar from './NotificationsBar';
import PictureEditor from './PictureEditor';
import '../../styles/layout/header/Header.css';

class Header extends Component {

  state = {
    pictureEditorActive: false,
  }

  handleClick = (clickedItem) => {
    this.setState((state) => ({
      [clickedItem]: !state[clickedItem]
    }))
  }

  handlePictureChange = (selectedPicture) => {
    document.querySelector('.header-picture').style.backgroundImage = `url(${selectedPicture})`;
    this.setState({
      pictureEditorActive: false,
    })
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