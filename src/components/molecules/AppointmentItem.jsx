import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';

const AppointmentItem = ({ appointment, patient, doctor, getStatusColor, index, className = '' }) => {
  const statusColor = getStatusColor(appointment.status);
  const formattedTime = new Date(appointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = new Date(appointment.dateTime).toLocaleDateString();

  return (
    <Card
      motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05 } }}
      className={`hover:border-primary transition-all duration-150 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-center min-w-[80px]">
            <p className="text-lg font-semibold text-surface-900">{formattedTime}</p>
            <p className="text-sm text-surface-600">{appointment.duration} min</p>
          </div>
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <ApperIcon name="User" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-surface-900">{patient?.name || 'Unknown Patient'}</h3>
            <p className="text-surface-600">{appointment.reason}</p>
            <p className="text-sm text-surface-500">Dr. {doctor?.name || 'Unknown Doctor'}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {appointment.status}
          </span>
          {appointment.notes && (
            <p className="text-sm text-surface-500 mt-2 max-w-[200px] truncate">{appointment.notes}</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AppointmentItem;