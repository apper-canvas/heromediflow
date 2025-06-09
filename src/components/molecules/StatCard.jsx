import React from 'react';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({ icon, title, value, iconBgClass, iconColorClass, delay }) => {
  return (
    <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: delay } }}>
      <div className="flex items-center">
        <div className={`w-12 h-12 ${iconBgClass} rounded-lg flex items-center justify-center`}>
          <ApperIcon name={icon} className={`w-6 h-6 ${iconColorClass}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-surface-600">{title}</p>
          <p className="text-2xl font-semibold text-surface-900">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;