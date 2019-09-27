import React from 'react';
import AccountNav from './AccountNav';
import AccountPage from './AccountPage';

const Account = () => {
  return (
    <>

      <div className="navigation"> {<AccountNav />} </div>
      <div className="page"> {<AccountPage />}</div>

    </>
  );
}

export default Account;