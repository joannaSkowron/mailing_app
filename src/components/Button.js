import React from 'react';
import '../styles/components/Button.css';


const Button = (props) => {

  const { type, buttonStyle, handleClick, text } = props;

  return (
    <button
      type={type}
      className={`buttonComponent ${buttonStyle}`}
      onClick={handleClick}>
      {text}
    </button>

  );
}

export default Button;