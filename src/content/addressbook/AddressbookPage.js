import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddressbookList from './AddressbookList';
import AddressbookAdd from './AddressbookAdd';
import Error from '../../layout/Error';


const AddressbookPage = () => {

  return (
    <>

      <Switch>

        <Route path='/addressbook/:folder' exact component={AddressbookList} />
        <Route path='/addressbook/add/new' component={AddressbookAdd} />
        <Route component={Error} />

      </Switch>

    </>
  );
}

export default AddressbookPage;