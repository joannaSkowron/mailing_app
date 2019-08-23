import React from 'react';
import { Switch, Route } from 'react-router-dom'
import '../styles/Page.css';
import Email from '../pages/Email';
import EmailCompose from '../pages/EmailCompose';
import Calendar from '../pages/Calendar';
import Addressbook from '../pages/Addressbook';
import AddressbookAdd from '../pages/AddressbookAdd';
import AccountInfo from '../pages/AccountInfo';
import AccountEdit from '../pages/AccountEdit';
import Signout from '../pages/Signout';
import Error from '../pages/Error';


const Page = () => {

  return (

    <Switch>
      <Route path='/email/:folder' component={Email} />
      <Route path='/email/compose' component={EmailCompose} />

      <Route path='/calendar' component={Calendar} />

      <Route path='/addressbook/favourites' component={Addressbook} />
      <Route path='/addressbook/add' component={AddressbookAdd} />
      <Route path='/addressbook/all' component={Addressbook} />
      <Route path='/addressbook/deleted' component={Addressbook} />

      <Route path='/account/info' component={AccountInfo} />
      <Route path='/account/edit' component={AccountEdit} />
      <Route path='/account/signout' component={Signout} />

      <Route component={Error} />

    </Switch>
  );
}

export default Page;