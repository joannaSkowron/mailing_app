import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../styles/Navigation.css';
import NavEmail from './NavEmail';
import NavCalendar from './NavCalendar';
import NavAddressbook from './NavAddressbook';
import NavAccount from './NavAccount';


const Navigation = () => {

  return (

    <Switch>
      <Route path='/' exact render={() => (
        <Redirect to='/email/inbox' />
      )} />
      <Route path='/email' exact render={() => (
        <Redirect to='/email/inbox' />
      )} />
      <Route path='/email' component={NavEmail} />

      <Route path='/calendar' component={NavCalendar} />

      <Route path='/addressbook' exact render={() => (
        <Redirect to='/addressbook/favourites' />
      )} />
      <Route path='/addressbook' component={NavAddressbook} />

      <Route path='/account' exact render={() => (
        <Redirect to='/account/info' />
      )} />
      <Route path='/account' component={NavAccount} />

      <Route render={() => (
        <Redirect to='/email/inbox' />
      )} />

    </Switch>

  );
}

export default Navigation;