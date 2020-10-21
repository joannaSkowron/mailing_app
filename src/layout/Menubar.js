import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/layout/Menubar.css';

const menuItems = [
  { name: 'Email', path: '/email/', icon: "far fa-envelope-open" },
  { name: 'Calendar', path: '/calendar/', icon: "far fa-calendar-alt" },
  { name: 'Addressbook', path: '/addressbook/', icon: "far fa-address-book" },
  { name: 'Account', path: '/account/', icon: "far fa-user" },
]

const Menubar = () => {
  const menu = menuItems.map(menuItem => (
    <div key={menuItem.name} className="menu-item-container" >

      <NavLink to={menuItem.path} exact={menuItem.exact ? menuItem.exact : false}>
        <li className='menu-item' title={menuItem.name}>
          <i className={menuItem.icon} ></i>
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