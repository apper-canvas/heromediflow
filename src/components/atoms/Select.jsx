import React from 'react';

const Select = ({ className = '', children, ...props }) => {
  return (
    <select
      className={`w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;