import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/EmailViewTools.css';



const EmailViewTools = (props) => {

  const id = props.data.id;

  return (
    <>
      <div className="email-view-tools-container">
        <Link to={`/email/new/compose?id=${id}&responsetype=reply`}>
          <div className="email-view-tools" title="Reply">
            <i className="fas fa-reply"></i>
          </div>
        </Link>

        <Link to={`/email/new/compose?id=${id}&responsetype=replyall`}>
          <div className="email-view-tools" title="Reply to all">
            <i className="fas fa-reply-all"></i>
          </div>
        </Link>

        <Link to={`/email/new/compose?id=${id}&responsetype=forward`}>
          <div className="email-view-tools" title="Forward">
            <i className="fas fa-share"></i>
          </div>
        </Link>


        <div className="email-view-tools" title="Move to spam">
          <i className='fas fa-ban'></i>
        </div>


        <div className="email-view-tools" title="Move to bin">
          <i className='far fa-trash-alt'></i>
        </div>

      </div>
    </>
  );
}

export default EmailViewTools;