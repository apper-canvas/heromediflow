import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import EmptyState from '@/components/atoms/EmptyState';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md"
      >
        <EmptyState
          icon="AlertCircle"
          title="Page Not Found"
          message="The page you're looking for doesn't exist or has been moved."
          motionIconProps={{ animate: { y: [0, -20, 0] }, transition: { repeat: Infinity, duration: 2 } }}
        >
          <h1 className="text-6xl font-bold text-surface-900 mb-4">404</h1>
          <div className="space-y-4">
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="Home" size={20} className="mr-2" />
              Go to Dashboard
            </Button>
            <Button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center px-6 py-3 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
              Go Back
            </Button>
          </div>
        </EmptyState>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;