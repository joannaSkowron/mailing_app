import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import AccountEdit from './AccountEdit';
import Signout from './Signout';
import Error from '../../layout/Error';


const AccountPage = () => {

  return (
    <>

      <Switch>

        <Route path='/account/info' component={AccountInfo} />
        <Route path='/account/edit' component={AccountEdit} />
        <Route path='/account/signout' component={Signout} />
        <Route component={Error} />

      </Switch>

    </>
  );
}

export default AccountPage;