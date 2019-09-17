import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Nav.css';

const navItems = [
  { name: 'Inbox', path: '/email/inbox', icon: <i className='far fa-envelope-open'></i> },
  { name: 'Sent', path: '/email/outbox', icon: <i className='far fa-paper-plane'></i> },
  { name: 'Drafts', path: '/email/draft', icon: <i className='fas fa-pencil-ruler'></i> },
  { name: 'Bin', path: '/email/bin', icon: <i className='far fa-trash-alt'></i> },
  { name: 'Spam', path: '/email/spam', icon: <i className='fas fa-ban'></i> },
]

const NavEmail = () => {

  const navigation = navItems.map(navItem => (

    <li key={navItem.name} className='nav-item' >
      <NavLink to={navItem.path} exact className='nav-item-container' >
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
          <div className='nav-item-btn'>
            <NavLink to='/email/new/compose' exact>
              <i className='fas fa-plus'></i>Compose
            </NavLink>
          </div>

          {navigation}
        </ul>
      </nav>
    </>
  );
}

export default NavEmail;