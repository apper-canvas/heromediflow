import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ApperIcon name="AlertCircle" className="w-24 h-24 text-surface-300 mx-auto mb-8" />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-surface-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-900 mb-4">Page Not Found</h2>
        <p className="text-surface-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
          >
            <ApperIcon name="Home" size={20} className="mr-2" />
            Go to Dashboard
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center px-6 py-3 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors duration-150"
          >
            <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;