import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import EmptyState from '@/components/atoms/EmptyState';

const PatientAppointmentsHistory = ({ appointments, getStatusColor, onNewAppointmentClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-surface-900">Appointment History</h3>
        <Button
          onClick={onNewAppointmentClick}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          New Appointment
        </Button>
      </div>

      {appointments && appointments.length > 0 ? (
        <div className="space-y-3">
          {appointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-surface-50 rounded-lg border border-surface-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="font-medium text-surface-900">
                        {new Date(appointment.dateTime).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-surface-600">
                        {new Date(appointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-surface-900">{appointment.reason}</p>
                      <p className="text-sm text-surface-600">{appointment.duration} minutes</p>
                    </div>
                  </div>
                  {appointment.notes && (
                    <p className="text-sm text-surface-600 mt-2">{appointment.notes}</p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState icon="Calendar" title="No appointments scheduled" message="No appointments have been recorded for this patient yet." />
      )}
    </motion.div>
  );
};

export default PatientAppointmentsHistory;