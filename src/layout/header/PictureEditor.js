import React, { Component } from 'react';
import avatar1 from '../../images/avatar1.png';
import avatar2 from '../../images/avatar2.png';
import avatar3 from '../../images/avatar3.png';
import avatar4 from '../../images/avatar4.png';
import avatar5 from '../../images/avatar5.png';
import avatar6 from '../../images/avatar6.png';
import '../../styles/layout/header/PictureEditor.css';
import Button from '../../components/Button';

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

  generatePictureEditorSelectorOptions = () => {
    const options = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

    const selectorOptions = options.map(option => (
      <img src={option} alt="Avatar" key={option}
        className="picture-editor-selector-img"
        onClick={event => this.handleSelector(event, { backgroundImage: `url(${option})` })} />
    ))

    return selectorOptions;
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

            {this.generatePictureEditorSelectorOptions()}

          </div>

          <div className="picture-editor-buttons">

            <Button
              type='button'
              buttonStyle='primary'
              handleClick={() => this.props.handlePictureChange(this.state.selectedPicture)}
              text='Apply' />

            <Button
              type='button'
              buttonStyle='secondary'
              handleClick={() => this.props.handleClick('pictureEditorActive')}
              text='Cancel' />

          </div>

        </div>

      </>
    );
  }
}

export default PictureEditor;