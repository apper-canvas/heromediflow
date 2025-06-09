import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-lg shadow-sm p-8 text-center"
    >
      <ApperIcon name="AlertCircle" className="w-12 h-12 text-error mx-auto mb-4" />
      <h3 className="text-lg font-medium text-surface-900 mb-2">Error Loading Data</h3>
      <p className="text-surface-600 mb-4">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;