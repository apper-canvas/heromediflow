import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/molecules/SearchBar';
import PatientListItem from '@/components/molecules/PatientListItem';
import EmptyState from '@/components/atoms/EmptyState';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const PatientTable = ({ patients, searchTerm, onSearchChange, calculateAge, onRegisterPatientClick }) => {
  const navigate = useNavigate();

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="mb-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder="Search patients by name, phone, ID, or email..."
        />
      </div>

      {filteredPatients.length > 0 ? (
        <div className="space-y-4">
          {filteredPatients.map((patient, index) => (
            <PatientListItem
              key={patient.id}
              patient={patient}
              calculateAge={calculateAge}
              onClick={() => navigate(`/patients/${patient.id}`)}
              index={index}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="Users"
          title={searchTerm ? 'No patients found' : 'No patients registered yet'}
          message={
            searchTerm
              ? `No patients match "${searchTerm}"`
              : 'Get started by registering your first patient'
          }
        >
          {!searchTerm && (
            <Button
              onClick={onRegisterPatientClick}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register First Patient
            </Button>
          )}
        </EmptyState>
      )}
    </>
  );
};

export default PatientTable;