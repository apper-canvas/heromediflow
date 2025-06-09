import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import EmptyState from '@/components/atoms/EmptyState';

const DashboardTodaysAppointments = ({ todaysAppointments, patients, getStatusColor, onViewAllAppointments }) => {
  return (
    <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 } }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-surface-900">Today's Appointments</h3>
        <Button
          onClick={onViewAllAppointments}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All
        </Button>
      </div>

      {todaysAppointments.length > 0 ? (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {todaysAppointments.slice(0, 5).map((appointment, index) => {
            const patient = patients.find(p => p.id === appointment.patientId);
            return (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-surface-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-surface-900">
                      {new Date(appointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-xs text-surface-600">{appointment.duration} min</p>
                  </div>
                  <div>
                    <p className="font-medium text-surface-900">{patient?.name || 'Unknown Patient'}</p>
                    <p className="text-sm text-surface-600">{appointment.reason}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon="Calendar" title="No appointments scheduled for today" message="Looks like your schedule is clear!" motionIconProps={{}} />
      )}
    </Card>
  );
};

export default DashboardTodaysAppointments;