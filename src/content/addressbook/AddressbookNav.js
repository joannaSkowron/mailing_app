import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/layout/Nav.css';

const navItems = [
  { name: 'All contacts', path: '/addressbook/all', icon: 'far fa-address-book' },
  { name: 'Favourite', path: '/addressbook/favourite', icon: 'far fa-heart' },
  { name: 'Personal', path: '/addressbook/personal', icon: 'fas fa-users' },
  { name: 'Work', path: '/addressbook/work', icon: 'fas fa-briefcase' },
  { name: 'School', path: '/addressbook/school', icon: 'fas fa-user-graduate' },
  { name: 'Deleted', path: '/addressbook/deleted', icon: 'far fa-trash-alt' },
]

const NavAddressbook = () => {
  const navigation = navItems.map(navItem => (
    <li className="nav-item" key={navItem.name} title={navItem.name}>
      <NavLink to={navItem.path} exact={navItem.exact ? navItem.exact : false}>
        <i className={navItem.icon} ></i>
        {navItem.name}
      </NavLink>
    </li>
  ))

  return (
    <>
      <nav className="nav-container">
        <ul className="nav">
          <li className="nav-item-btn">
            <NavLink to='/addressbook/add/new' exact>
              <i className='fas fa-plus'></i>
              Add
            </NavLink>
          </li>
          {navigation}
        </ul>
      </nav>
    </>
  );
}

export default NavAddressbook;