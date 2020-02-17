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
    selectedPicture: null,
  }

  handleSelector(event, selectedPicture) {
    this.setState({
      selectedPicture: this.state.selectedPicture === selectedPicture ? null : selectedPicture,
    });
    document.querySelectorAll('.picture-editor-selector-item').forEach(item => item.classList.remove('active'));
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
            <div className="picture-editor-selector-item" onClick={event => this.handleSelector(event, avatar1)}></div>
            <div className="picture-editor-selector-item" onClick={event => this.handleSelector(event, avatar2)}></div>
            <div className="picture-editor-selector-item" onClick={event => this.handleSelector(event, avatar3)}></div>
            <div className="picture-editor-selector-item" onClick={event => this.handleSelector(event, avatar4)}></div>
            <div className="picture-editor-selector-item" onClick={event => this.handleSelector(event, avatar5)}></div>
            <div className="picture-editor-selector-item" onClick={event => this.handleSelector(event, avatar6)}></div>
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