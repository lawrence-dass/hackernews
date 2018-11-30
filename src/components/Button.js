import React from 'react';

const Button = ({ className = '', onClick, children }) => (
  <button onClick={onClick} type="type" className={className}>
    {children}
  </button>
);

export default Button;
