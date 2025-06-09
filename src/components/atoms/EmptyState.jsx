import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const EmptyState = ({ icon, title, message, children, motionIconProps = {} }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-lg shadow-sm p-12 text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        {...motionIconProps}
      >
        <ApperIcon name={icon} className="w-16 h-16 text-surface-300 mx-auto mb-4" />
      </motion.div>
      <h3 className="text-lg font-medium text-surface-900 mb-2">{title}</h3>
      <p className="text-surface-600 mb-4">{message}</p>
      {children}
    </motion.div>
  );
};

export default EmptyState;