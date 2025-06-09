import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const LoadingSpinner = ({ size = 24, className = 'text-primary' }) => {
  return (
    <div className="flex items-center justify-center">
      <ApperIcon name="Loader2" size={size} className={`${className} animate-spin`} />
    </div>
  );
};

export default LoadingSpinner;