import React from 'react';
import { Switch, Route } from 'react-router-dom'
import EmailList from './EmailList';
import EmailCompose from './EmailCompose';
import EmailView from './EmailView';
import Error from '../../layout/Error';


const EmailPage = () => {

  return (
    <>

      <Switch>
        <Route path='/email/:folder' exact component={EmailList} />
        <Route path='/email/viewemail/:folder/:id' exact component={EmailView} />
        <Route path='/email/compose/new' component={EmailCompose} />

        <Route component={Error} />

      </Switch>
    </>
  );
}

export default EmailPage;