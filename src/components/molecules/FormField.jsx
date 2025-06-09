import React from 'react';

const FormField = ({ label, children, className = '', required = false }) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-surface-700 mb-2">
        {label} {required && <span className="text-error">*</span>}
      </label>
      {children}
    </div>
  );
};

export default FormField;