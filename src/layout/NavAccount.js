import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Account info', path: '/account/info', exact: true, icon: <i className="fas fa-info"></i> },
  { name: 'Edit', path: '/account/edit', exact: true, icon: <i className="far fa-edit"></i> },
  { name: 'Sign out', path: '/account/signout', exact: true, icon: <i className="far fa-arrow-alt-circle-right"></i> },
]

const NavAccount = () => {

  const navigation = navItems.map(navItem => (

    < li className="nav-item" key={navItem.name} >
      <NavLink to={navItem.path} exact={navItem.exact ? navItem.exact : false}>
        {navItem.icon}{navItem.name}
      </NavLink>
    </li >
  ));

  return (
    <>
      <header>
        <h1 className='nav-header'>Account</h1>
      </header>
      <nav className="nav-container">

        <ul className="nav">
          {navigation}
        </ul>

      </nav>
    </>
  );
}

export default NavAccount;