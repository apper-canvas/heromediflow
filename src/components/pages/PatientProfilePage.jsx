import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import PatientProfileHeader from '@/components/organisms/PatientProfileHeader';
import PatientProfileTabs from '@/components/organisms/PatientProfileTabs';
import { patientService, appointmentService } from '@/services';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';

const PatientProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPatientData();
  }, [id]);

  const loadPatientData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [patientData, allAppointmentsData] = await Promise.all([
        patientService.getById(id),
        appointmentService.getAll()
      ]);

      if (!patientData) {
        setError('Patient not found');
        return;
      }

      setPatient(patientData);
      setAppointments(allAppointmentsData.filter(apt => apt.patientId === id));
    } catch (err) {
      setError(err.message || 'Failed to load patient data');
      toast.error('Failed to load patient data');
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleScheduleAppointmentClick = () => {
    // Navigate to appointments page or open a modal
    navigate('/appointments');
    toast.info('Navigating to appointment scheduling');
  };

  if (loading) {
    return (
      <div className="p-6">
        <SkeletonLoader type="profile" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage message={error} onRetry={loadPatientData}>
          <Button
            onClick={() => navigate('/patients')}
            className="px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 ml-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Patients
          </Button>
        </ErrorMessage>
      </div>
    );
  }

  if (!patient) {
    return null; // Or some fallback UI if patient is null after loading and no error
  }

  return (
    <div className="p-6 max-w-full overflow-hidden">
      <PatientProfileHeader
        patient={patient}
        calculateAge={calculateAge}
        onScheduleAppointmentClick={handleScheduleAppointmentClick}
      />
      <PatientProfileTabs
        patient={patient}
        appointments={appointments}
      />
    </div>
  );
};

export default PatientProfilePage;