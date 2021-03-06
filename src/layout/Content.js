import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Email from '../content/email/Email';
import Calendar from '../content/calendar/Calendar';
import Addressbook from '../content/addressbook/Addressbook';
import About from '../content/about/About';
import '../styles/layout/Content.css';

const Content = () => {
  return (
    <>

      <div className="content-container">

        <Switch>
          <Route path='/' exact render={() => (
            <Redirect to='/email/inbox' />
          )} />
          <Route path='/email' exact render={() => (
            <Redirect to='/email/inbox' />
          )} />
          <Route path='/email' component={Email} />

          <Route path='/calendar' component={Calendar} />

          <Route path='/addressbook' exact render={() => (
            <Redirect to='/addressbook/all' />
          )} />
          <Route path='/addressbook' component={Addressbook} />

          <Route path='/about' component={About} />

          <Route render={() => (
            <Redirect to='/email/inbox' />
          )} />

        </Switch>

      </div>
    </>
  );
}

export default Content;