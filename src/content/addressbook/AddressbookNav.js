import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/layout/Nav.css';

const navItems = [
  { name: 'Favourites', path: '/addressbook/favourites', icon: <i className="far fa-heart"></i> },
  { name: 'All', path: '/addressbook/all', icon: <i className="far fa-address-card"></i> },
  { name: 'Deleted', path: '/addressbook/deleted', icon: <i className='far fa-trash-alt'></i> },
]


const NavAddressbook = () => {

  const navigation = navItems.map(navItem => (
    <li className="nav-item" key={navItem.name}>
      <NavLink to={navItem.path} exact={navItem.exact ? navItem.exact : false}>
        {navItem.icon}{navItem.name}
      </NavLink>
    </li>
  ))

  return (
    <>
      <header>
        <h1 className='nav-header'>Contacts</h1>
      </header>
      <nav className="nav-container">
        <ul className="nav">
          <li className="nav-item-btn">
            <NavLink to='/addressbook/add/new' exact>
              <i className='fas fa-plus'></i>Add
            </NavLink>
          </li>
          {navigation}
        </ul>
      </nav>
    </>
  );
}

export default NavAddressbook;