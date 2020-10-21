import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Email from '../content/email/Email';
import Calendar from '../content/calendar/Calendar';
import Addressbook from '../content/addressbook/Addressbook';
import Account from '../content/account/Account';
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

          <Route path='/account' exact render={() => (
            <Redirect to='/account/info' />
          )} />
          <Route path='/account' component={Account} />

          <Route render={() => (
            <Redirect to='/email/inbox' />
          )} />

        </Switch>

      </div>
    </>
  );
}

export default Content;