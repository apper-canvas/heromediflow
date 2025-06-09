import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import EmptyState from '@/components/atoms/EmptyState';

const PatientMedications = ({ medications, onAddMedicationClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-surface-900">Current Medications</h3>
        <Button
          onClick={onAddMedicationClick}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Medication
        </Button>
      </div>

      {medications && medications.length > 0 ? (
        <div className="space-y-4">
          {medications.map((medication, index) => (
            <div key={index} className="p-4 bg-surface-50 rounded-lg border border-surface-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-surface-900">{medication.name}</p>
                  <p className="text-sm text-surface-600">{medication.dosage}</p>
                  <p className="text-sm text-surface-600">{medication.frequency}</p>
                </div>
                <span className="text-xs text-surface-500">Started: {medication.startDate}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState icon="Pill" title="No current medications" message="This patient is not currently on any medications." />
      )}
    </motion.div>
  );
};

export default PatientMedications;