import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddressbookList from './AddressbookList';
import AddressbookAdd from './AddressbookAdd';
import AddressbookContactView from './AddressbookContactView';
import Error from '../../layout/Error';


const AddressbookPage = () => {

  return (
    <>

      <Switch>

        <Route path='/addressbook/:category' exact component={AddressbookList} />
        <Route path='/addressbook/add/new' component={AddressbookAdd} />
        <Route path='/addressbook/:category/contactview/:id' component={AddressbookContactView} />
        <Route component={Error} />

      </Switch>

    </>
  );
}

export default AddressbookPage;