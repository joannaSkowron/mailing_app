import React from 'react';
import { Link } from 'react-router-dom';
import { FetchService } from '../services/FetchService';
import '../styles/components/AddressbookListTools.css';
import { toast } from 'react-toastify';



const AddressbookListTools = (props) => {

  const { id, email, handleDeletingContact } = props;
  const fetchService = new FetchService();

  const deleteContact = () => {
    const API = `/api/Contact/${id}`;
    const options = { method: 'delete' };
    const successCallback = () => {
      handleDeletingContact();
      toast('Contact deleted');
    };
    const failureCallback = (err) => {
      console.log(err, err.name);
      toast.error('Failed to delete contact');
    };

    fetchService.useFetch(API, options, successCallback, failureCallback);
  }

  return (
    <>
      <div className="addressbook-list-tools-container">

        <Link to={`/email/compose/new?address=${email}`} className="addressbook-list-tools" title="Compose e-mail">
          <i className="far fa-envelope"></i>
        </Link>

        <Link to={`/addressbook/add/new?id=${id}`} className="addressbook-list-tools" title="Edit">
          <i className="far fa-edit"></i>
        </Link>

        <div className="addressbook-list-tools"
          title="Delete"
          onClick={deleteContact}>
          <i className="far fa-trash-alt"></i>
        </div>

      </div>
    </>
  );
}

export default AddressbookListTools;