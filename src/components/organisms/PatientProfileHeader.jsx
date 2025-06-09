import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';

const PatientProfileHeader = ({ patient, calculateAge, onScheduleAppointmentClick }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate('/patients')}
            className="p-2 hover:bg-surface-100 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-surface-900">Patient Profile</h1>
            <p className="text-surface-600">View and manage patient information</p>
          </div>
        </div>
        <Button
          onClick={onScheduleAppointmentClick}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Calendar" size={16} className="mr-2" />
          Schedule Appointment
        </Button>
      </div>

      <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} className="mb-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <ApperIcon name="User" size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-surface-900">{patient.name}</h2>
            <div className="flex items-center space-x-6 mt-2 text-surface-600">
              <span>Age: {calculateAge(patient.dateOfBirth)}</span>
              <span>•</span>
              <span>{patient.gender}</span>
              <span>•</span>
              <span>ID: {patient.id}</span>
            </div>
            <div className="flex items-center space-x-6 mt-1 text-surface-600">
              <span>{patient.phone}</span>
              {patient.email && (
                <>
                  <span>•</span>
                  <span>{patient.email}</span>
                </>
              )}
            </div>
          </div>
          {patient.bloodType && (
            <div className="text-center">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center">
                <ApperIcon name="Droplets" className="w-8 h-8 text-error" />
              </div>
              <p className="text-sm font-medium text-surface-900 mt-2">{patient.bloodType}</p>
            </div>
          )}
        </div>

        {patient.allergies && patient.allergies.length > 0 && (
          <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-2">
              <ApperIcon name="AlertTriangle" className="w-5 h-5 text-warning" />
              <span className="font-medium text-warning">Allergies:</span>
              <span className="text-surface-900">{patient.allergies.join(', ')}</span>
            </div>
          </div>
        )}
      </Card>
    </>
  );
};

export default PatientProfileHeader;