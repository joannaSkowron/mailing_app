import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/layout/Menubar.css';

const menuItems = [
  { name: 'Email', path: '/email/', icon: <i className="far fa-envelope-open" title="Email"></i> },
  { name: 'Calendar', path: '/calendar/', icon: <i className="far fa-calendar-alt" title="Calendar"></i> },
  { name: 'Addressbook', path: '/addressbook/', icon: <i className="far fa-address-book" title="Addressbook"></i> },
  { name: 'Account', path: '/account/', icon: <i className="far fa-user" title="Account info"></i> },
]

const Menubar = () => {
  const menu = menuItems.map(menuItem => (
    <div key={menuItem.name} className="menu-item-container">

      <NavLink to={menuItem.path} exact={menuItem.exact ? menuItem.exact : false}>
        <li className='menu-item'>
          {menuItem.icon}
        </li>
      </NavLink>

    </div>
  ))

  return (
    <nav className='menu-container'>
      <ul className='menu'>
        {menu}
      </ul>
    </nav>
  );
}

export default Menubar;