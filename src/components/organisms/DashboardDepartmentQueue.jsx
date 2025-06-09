import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';

const DashboardDepartmentQueue = ({ departments }) => {
  return (
    <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.7 } }}>
      <h3 className="text-lg font-semibold text-surface-900 mb-4">Department Queue Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((department, index) => (
          <motion.div
            key={department.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-surface-50 rounded-lg hover:bg-surface-100 cursor-pointer transition-colors duration-150"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-surface-900">{department.name}</h4>
              <div className={`w-3 h-3 rounded-full ${
                department.activeQueue.length === 0 ? 'bg-success' :
                department.activeQueue.length <= 3 ? 'bg-warning' : 'bg-error'
              }`}></div>
            </div>
            <p className="text-sm text-surface-600 mb-2">{department.location}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-surface-900">
                {department.activeQueue.length} waiting
              </span>
              <span className="text-sm text-surface-600">
                ~{department.avgWaitTime}min wait
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default DashboardDepartmentQueue;