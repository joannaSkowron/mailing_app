import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Menubar.css';

const menuItems = [
  { name: 'Email', path: '/email/', icon: <i class="far fa-envelope-open" title="Email"></i> },
  { name: 'Calendar', path: '/calendar/', icon: <i class="far fa-calendar-alt" title="Calendar"></i> },
  { name: 'Addressbook', path: '/addressbook/', icon: <i class="far fa-address-book" title="Addressbook"></i> },
  { name: 'Account', path: '/account/', icon: <i class="far fa-user" title="Account info"></i> },
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