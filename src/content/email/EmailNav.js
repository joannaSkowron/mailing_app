import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/layout/Nav.css';

const navItems = [
  { name: 'Inbox', path: '/email/inbox', icon: 'far fa-envelope-open' },
  { name: 'Sent', path: '/email/outbox', icon: 'far fa-paper-plane' },
  { name: 'Drafts', path: '/email/draft', icon: 'fas fa-pencil-ruler' },
  { name: 'Trash', path: '/email/trash', icon: 'far fa-trash-alt' },
  { name: 'Spam', path: '/email/spam', icon: 'fas fa-ban' },
]

const NavEmail = () => {

  const navigation = navItems.map(navItem => (

    <li key={navItem.name} className='nav-item' >
      <NavLink to={navItem.path} className='nav-item-container' >
        <i className={navItem.icon}></i>
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