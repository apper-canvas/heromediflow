import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import TabButton from '@/components/molecules/TabButton';
import Card from '@/components/atoms/Card';
import PatientAppointmentsHistory from '@/components/organisms/PatientAppointmentsHistory';
import PatientMedicalHistory from '@/components/organisms/PatientMedicalHistory';
import PatientMedications from '@/components/organisms/PatientMedications';

const PatientProfileTabs = ({ patient, appointments }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'scheduled': return 'bg-info text-white';
      case 'confirmed': return 'bg-success text-white';
      case 'in-progress': return 'bg-warning text-white';
      case 'completed': return 'bg-surface-600 text-white';
      case 'cancelled': return 'bg-error text-white';
      default: return 'bg-surface-400 text-white';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'appointments', label: 'Appointments', icon: 'Calendar' },
    { id: 'medical', label: 'Medical History', icon: 'FileText' },
    { id: 'medications', label: 'Medications', icon: 'Pill' }
  ];

  return (
    <Card className="p-0">
      <div className="border-b border-surface-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-surface-900 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-surface-600">Date of Birth</p>
                    <p className="text-surface-900">{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-600">Phone</p>
                    <p className="text-surface-900">{patient.phone}</p>
                  </div>
                  {patient.email && (
                    <div>
                      <p className="text-sm font-medium text-surface-600">Email</p>
                      <p className="text-surface-900">{patient.email}</p>
                    </div>
                  )}
                  {patient.address && (
                    <div>
                      <p className="text-sm font-medium text-surface-600">Address</p>
                      <p className="text-surface-900">{patient.address}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-surface-900 mb-4">Emergency Contact</h3>
                {patient.emergencyContact && patient.emergencyContact.name ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-surface-600">Name</p>
                      <p className="text-surface-900">{patient.emergencyContact.name}</p>
                    </div>
                    {patient.emergencyContact.phone && (
                      <div>
                        <p className="text-sm font-medium text-surface-600">Phone</p>
                        <p className="text-surface-900">{patient.emergencyContact.phone}</p>
                      </div>
                    )}
                    {patient.emergencyContact.relationship && (
                      <div>
                        <p className="text-sm font-medium text-surface-600">Relationship</p>
                        <p className="text-surface-900">{patient.emergencyContact.relationship}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-surface-500">No emergency contact information</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'appointments' && (
          <PatientAppointmentsHistory appointments={appointments} getStatusColor={getStatusColor} />
        )}

        {activeTab === 'medical' && (
          <PatientMedicalHistory medicalHistory={patient.medicalHistory} />
        )}

        {activeTab === 'medications' && (
          <PatientMedications medications={patient.currentMedications} />
        )}
      </div>
    </Card>
  );
};

export default PatientProfileTabs;