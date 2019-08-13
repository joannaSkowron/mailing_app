import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../styles/Navigation.css';
import NavEmail from './NavEmail';
import NavCalendar from './NavCalendar';
import NavAddressbook from './NavAddressbook';
import NavAccount from './NavAccount';
import Error from '../pages/Error';


const Navigation = () => {

  return (

    <Switch>
      <Route path='/' exact render={() => (
        <Redirect to='/email/inbox' />
      )} />
      <Route path='/email' component={NavEmail} />
      <Route path='/calendar' component={NavCalendar} />
      <Route path='/addressbook' component={NavAddressbook} />
      <Route path='/account' component={NavAccount} />
      <Route component={Error} />
    </Switch>

  );
}

export default Navigation;