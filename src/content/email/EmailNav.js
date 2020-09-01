import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/layout/Nav.css';

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
        {navItem.icon}
        <p>{navItem.name}</p>
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
            <NavLink to='/email/compose/new' exact>
              <i className="fas fa-pencil-alt"></i>
              <p>Compose</p>
            </NavLink>
          </div>

          {navigation}
        </ul>
      </nav>
    </>
  );
}

export default NavEmail;