import React, { Component } from 'react';
import '../styles/layout/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Menubar from './Menubar';
import Header from './header/Header';
import Content from './Content';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

  constructor(props) {
    super(props);

    const localStorageTheme = JSON.parse(localStorage.getItem('appTheme'));
    this.state = {
      appTheme: localStorageTheme ?? { backgroundImage: 'linear-gradient(120deg, #96adcb 50%, #c2e9fb 100%)' },
    }
  }

  handleBackgroundChange = (style) => {
    this.setState({
      appTheme: style,
    });

    const styleJSON = JSON.stringify(style);
    localStorage.setItem('appTheme', styleJSON);
  }

  render() {
    return (
      <>
        <Router basename="/mailing_app/#">
          <div className="app" style={this.state.appTheme}>
            <div className="header">{<Header handleBackgroundChange={this.handleBackgroundChange} />}</div>
            <div className="main-container">
              <div className="menubar">{<Menubar />}</div>
              <div className="content">{<Content />}</div>
            </div>

          </div>
        </Router >

        <ToastContainer
          position="bottom-left"
          limit={3}
          autoClose={2500}
          transition={Zoom} />
      </>
    )
  };
}

export default App;
