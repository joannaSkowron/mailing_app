import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Nav.css';

const navItems = [
  { name: 'Inbox', path: '/email/inbox', exact: true, icon: <i class='far fa-envelope-open'></i> },
  { name: 'Sent', path: '/email/sent', icon: <i class='far fa-paper-plane'></i> },
  { name: 'Drafts', path: '/email/drafts', icon: <i class='fas fa-pencil-ruler'></i> },
  { name: 'Bin', path: '/email/bin', icon: <i class='far fa-trash-alt'></i> },
  { name: 'Spam', path: '/email/spam', icon: <i class='fas fa-ban'></i> },
]

const NavEmail = () => {

  const navigation = navItems.map(navItem => (
    <li key={navItem.name} className='nav-item'>
      <NavLink to={navItem.path} exact={navItem.exact ? navItem.exact : false}>
        {navItem.icon}{navItem.name}
      </NavLink>
    </li>
  ))

  return (
    <>
      <header>
        <h1 className='nav-header'>Email</h1>
      </header>
      <nav className='nav-container'>

        <ul className='nav'>
          <li className='nav-item nav-item-btn'>
            <NavLink to='/email/compose' exact>
              <i class='fas fa-plus'></i>Compose
      </NavLink> </li>
          {navigation}
        </ul>
      </nav>
    </>
  );
}

export default NavEmail;