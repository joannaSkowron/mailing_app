import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/AddressbookListTools.css';



const AddressbookListTools = (props) => {

  const { id, address } = props;

  return (
    <>
      <div className="addressbook-list-tools-container">

        <Link to={`/email/compose/new?address=${address}`} className="addressbook-list-tools" title="Compose e-mail">
          <i className="far fa-envelope"></i>
        </Link>

        <Link to={`/addressbook/add/new?id=${id}`} className="addressbook-list-tools" title="Edit">
          <i className="far fa-edit"></i>
        </Link>

        <div className="addressbook-list-tools" title="Delete">
          <i className="far fa-trash-alt"></i>
        </div>

      </div>
    </>
  );
}

export default AddressbookListTools;