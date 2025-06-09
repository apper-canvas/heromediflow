import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const TabButton = ({ label, icon, isActive, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
        isActive
          ? 'border-primary text-primary'
          : 'border-transparent text-surface-500 hover:text-surface-700 hover:border-surface-300'
      }`}
      whileHover={false} // Disable motion on these as they're not primary action buttons
      whileTap={false}
    >
      <ApperIcon name={icon} size={16} className="mr-2" />
      {label}
    </Button>
  );
};

export default TabButton;