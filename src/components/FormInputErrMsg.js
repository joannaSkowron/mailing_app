import React from 'react';
import '../styles/components/FormInputErrMsg.css';

const FormInputErrMsg = (props) => {

  return (
    <span className='form-input-error-msg'>{props.errMsg}</span>
  );
}

export default FormInputErrMsg;