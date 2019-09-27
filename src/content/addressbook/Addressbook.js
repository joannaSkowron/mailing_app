import React from 'react';
import AddressbookNav from './AddressbookNav';
import AddressbookPage from './AddressbookPage';
import '../../styles/layout/Content.css';

const Addressbook = () => {
  return (
    <>

      <div className="navigation"> {<AddressbookNav />} </div>
      <div className="page"> {<AddressbookPage />}</div>

    </>
  );
}

export default Addressbook;