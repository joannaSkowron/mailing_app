import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/AddressbookListTools.css';



const AddressbookListTools = (props) => {

  const id = props.id;

  return (
    <>
      <div className="addressbook-list-tools-container">

        <Link to={`/email/compose/new?id=${id}&responsetype=reply`} className="addressbook-list-tools" title="Compose e-mail">
          <i className="far fa-envelope"></i>
        </Link>

        <Link to={`/email/compose/new?id=${id}&responsetype=replyall`} className="addressbook-list-tools" title="Edit">
          <i className="far fa-edit"></i>
        </Link>

        <Link to={`/email/compose/new?id=${id}&responsetype=forward`} className="addressbook-list-tools" title="Delete">
          <i className="far fa-trash-alt"></i>
        </Link>

      </div>
    </>
  );
}

export default AddressbookListTools;