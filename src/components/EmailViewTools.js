import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/EmailViewTools.css';



const EmailViewTools = (props) => {

  const id = props.data.id;
  const { reply, replyAll, forward, edit, moveToInbox, moveToSpam, moveToBin } = props;

  return (
    <>
      <div className="email-view-tools-container">

        {reply && <Link to={`/email/compose/new?id=${id}&responsetype=reply`}>
          <div className="email-view-tools" title="Reply">
            <i className="fas fa-reply"></i>
          </div>
        </Link>}

        {replyAll && <Link to={`/email/compose/new?id=${id}&responsetype=replyall`}>
          <div className="email-view-tools" title="Reply to all">
            <i className="fas fa-reply-all"></i>
          </div>
        </Link>}

        {forward && <Link to={`/email/compose/new?id=${id}&responsetype=forward`}>
          <div className="email-view-tools" title="Forward">
            <i className="fas fa-share"></i>
          </div>
        </Link>}

        {edit && <Link to={`/email/compose/new?id=${id}&responsetype=edit`}>
          <div className="email-view-tools" title="Edit">
            <i className="far fa-edit"></i>
          </div>
        </Link>}

        {moveToInbox && <div className="email-view-tools" title="Move to inbox">
          <i className='far fa-envelope-open'></i>
        </div>}

        {moveToSpam && <div className="email-view-tools" title="Move to spam">
          <i className='fas fa-ban'></i>
        </div>}

        {moveToBin && <div className="email-view-tools" title="Move to bin">
          <i className='far fa-trash-alt'></i>
        </div>}

      </div>
    </>
  );
}

export default EmailViewTools;