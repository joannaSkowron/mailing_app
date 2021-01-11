import React, { Component } from 'react';
import avatar1 from '../../images/avatar1.png';
import avatar2 from '../../images/avatar2.png';
import avatar3 from '../../images/avatar3.png';
import avatar4 from '../../images/avatar4.png';
import avatar5 from '../../images/avatar5.png';
import avatar6 from '../../images/avatar6.png';
import '../../styles/layout/header/PictureEditor.css';

class PictureEditor extends Component {

  state = {
    selectedPicture: {},
  }

  handleSelector(event, selectedPicture) {
    this.setState({
      selectedPicture: this.state.selectedPicture === selectedPicture ? null : selectedPicture,
    });
    document.querySelectorAll('.picture-editor-selector-img').forEach(item => item.classList.remove('active'));
    event.target.classList.toggle('active');
  }

  render() {

    return (
      <>

        <div className="picture-editor-page-container"
          onClick={() => this.props.handleClick('pictureEditorActive')}>
        </div>

        <div className="picture-editor-container">
          <p className="picture-editor-title">Select profile picture:</p>

          <div className="picture-editor-selector">

            <img src={avatar1} alt="Avatar"
              className="picture-editor-selector-img"
              onClick={event => this.handleSelector(event, { backgroundImage: `url(${avatar1})` })} />

            <img src={avatar2} alt="Avatar"
              className="picture-editor-selector-img"
              onClick={event => this.handleSelector(event, { backgroundImage: `url(${avatar2})` })} />

            <img src={avatar3} alt="Avatar"
              className="picture-editor-selector-img"
              onClick={event => this.handleSelector(event, { backgroundImage: `url(${avatar3})` })} />

            <img src={avatar4} alt="Avatar"
              className="picture-editor-selector-img"
              onClick={event => this.handleSelector(event, { backgroundImage: `url(${avatar4})` })} />

            <img src={avatar5} alt="Avatar"
              className="picture-editor-selector-img"
              onClick={event => this.handleSelector(event, { backgroundImage: `url(${avatar5})` })} />

            <img src={avatar6} alt="Avatar"
              className="picture-editor-selector-img"
              onClick={event => this.handleSelector(event, { backgroundImage: `url(${avatar6})` })} />

          </div>

          <div className="picture-editor-buttons">
            <button className="picture-editor-button"
              onClick={() => this.props.handlePictureChange(this.state.selectedPicture)}>
              Apply</button>
            <button className="picture-editor-button"
              onClick={() => this.props.handleClick('pictureEditorActive')}>
              Cancel
            </button>
          </div>

        </div>

      </>
    );
  }
}

export default PictureEditor;