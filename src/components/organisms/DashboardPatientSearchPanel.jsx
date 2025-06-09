import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import EmptyState from '@/components/atoms/EmptyState';

const DashboardPatientSearchPanel = ({ searchTerm, onSearchChange, patients, onPatientClick }) => {
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 } }}>
      <h3 className="text-lg font-semibold text-surface-900 mb-4">Quick Patient Search</h3>
      <div className="mb-4">
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} placeholder="Search by name, phone, or patient ID..." />
      </div>

      {searchTerm && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredPatients.length > 0 ? (
            filteredPatients.slice(0, 5).map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => onPatientClick(patient.id)}
                className="flex items-center justify-between p-3 bg-surface-50 rounded-lg hover:bg-surface-100 cursor-pointer transition-colors duration-150"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <ApperIcon name="User" size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-surface-900">{patient.name}</p>
                    <p className="text-sm text-surface-600">{patient.phone} • ID: {patient.id}</p>
                  </div>
                </div>
                <ApperIcon name="ChevronRight" className="w-5 h-5 text-surface-400" />
              </motion.div>
            ))
          ) : (
            <EmptyState icon="UserX" title="No patients found" message={`No patients found matching "${searchTerm}"`} motionIconProps={{}} />
          )}
        </div>
      )}
    </Card>
  );
};

export default DashboardPatientSearchPanel;