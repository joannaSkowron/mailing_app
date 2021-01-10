import React, { Component } from 'react';
import '../../styles/layout/header/Settings.css';
import bgcImage1 from '../../images/bgc-image1.jpg';

class Settings extends Component {

  state = {}

  handleClick = (style) => {
    this.props.handleBackgroundChange(style)
  }

  generateThemes = () => {
    const themesArr = [
      {
        name: 'Lightblue',
        style: { backgroundImage: 'linear-gradient(120deg, #96adcb 50%, #c2e9fb 100%)' }
      },
      {
        name: 'Salmon',
        style: { backgroundImage: 'linear-gradient(142deg, rgba(222,160,155,1) 40%, rgba(245,239,239,1) 100%)' }
      },
      {
        name: 'Pastel forest',
        style: { backgroundImage: 'linear-gradient(142deg, rgba(161,189,163,1) 40%, rgba(222,236,221,1) 100%)' }
      },
      {
        name: 'Colorful background',
        style: {
          backgroundImage: `url(${bgcImage1})`,
          backgroundSize: 'cover',
        }
      },
      {
        name: 'Intesive',
        style: { backgroundImage: 'linear-gradient( 291.1deg,  rgba(0,40,70,0.8) -4.8%, rgba(255,115,115,0.6) 82.7%, rgba(255,175,123,0.4) 97.2% )' }
      },
    ];

    const themes = themesArr.map(theme => {
      return (
        <div key={theme.name} className="settings-content-theme" onClick={() => this.handleClick(theme.style)}>
          <div className="settings-content-theme-color" style={theme.style}></div>
          <div className="settings-content-theme-name">{theme.name}</div>
        </div>
      )
    });

    return themes;
  }

  render() {

    return (

      <div className="settings-container">
        <div className="settings-header">
          <p>Settings</p>
        </div>
        <div className="settings-content">
          <p>Change theme:</p>
          <div className="settings-content-themes-container">

            {this.generateThemes()}

          </div>

        </div>
      </div>

    );
  }
}

export default Settings;