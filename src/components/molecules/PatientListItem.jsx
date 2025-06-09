import React from 'react';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const PatientListItem = ({ patient, calculateAge, onClick, index }) => {
  return (
    <Card
      onClick={onClick}
      motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05 } }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <ApperIcon name="User" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-surface-900">{patient.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-surface-600">
              <span>Age: {calculateAge(patient.dateOfBirth)}</span>
              <span>•</span>
              <span>{patient.gender}</span>
              <span>•</span>
              <span>{patient.phone}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-surface-600">Patient ID</p>
          <p className="font-mono text-surface-900">{patient.id}</p>
        </div>
      </div>

      {patient.allergies && patient.allergies.length > 0 && (
        <div className="mt-4 flex items-center space-x-2">
          <ApperIcon name="AlertTriangle" className="w-4 h-4 text-warning" />
          <span className="text-sm text-surface-600">
            Allergies: {patient.allergies.join(', ')}
          </span>
        </div>
      )}
    </Card>
  );
};

export default PatientListItem;