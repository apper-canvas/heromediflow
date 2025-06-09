import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';

const ReportsHeader = ({ dateRange, setDateRange, onExportClick }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-surface-900">Reports & Analytics</h1>
        <p className="text-surface-600">Hospital performance metrics and insights</p>
      </div>
      <div className="mt-4 sm:mt-0 flex items-center space-x-4">
        <Select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-2"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </Select>
        <Button
          onClick={onExportClick}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Download" size={16} className="mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default ReportsHeader;