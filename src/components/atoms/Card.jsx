import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', motionProps = {}, onClick }) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm p-6 border border-surface-200 ${onClick ? 'cursor-pointer hover:border-primary transition-all duration-150' : ''} ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default Card;