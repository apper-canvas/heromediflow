import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import DashboardMetricsGrid from '@/components/organisms/DashboardMetricsGrid';
import DashboardPatientSearchPanel from '@/components/organisms/DashboardPatientSearchPanel';
import DashboardTodaysAppointments from '@/components/organisms/DashboardTodaysAppointments';
import DashboardDepartmentQueue from '@/components/organisms/DashboardDepartmentQueue';
import { patientService, appointmentService, departmentService } from '@/services';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';

const DashboardPage = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [patientsData, appointmentsData, departmentsData] = await Promise.all([
        patientService.getAll(),
        appointmentService.getAll(),
        departmentService.getAll()
      ]);
      setPatients(patientsData);
      setAppointments(appointmentsData);
      setDepartments(departmentsData);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const todaysAppointments = appointments.filter(apt => {
    const today = new Date();
    const aptDate = new Date(apt.dateTime);
    return aptDate.toDateString() === today.toDateString();
  });

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

  if (loading) {
    return (
      <div className="p-6">
        <SkeletonLoader type="dashboard" count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage message={error} onRetry={loadDashboardData} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-full overflow-hidden">
      <DashboardMetricsGrid
        totalPatients={patients.length}
        todaysAppointmentsCount={todaysAppointments.length}
        activeDepartmentsCount={departments.length}
      />
      <DashboardPatientSearchPanel
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        patients={patients}
        onPatientClick={(patientId) => navigate(`/patients/${patientId}`)}
      />
      <DashboardTodaysAppointments
        todaysAppointments={todaysAppointments}
        patients={patients}
        getStatusColor={getStatusColor}
        onViewAllAppointments={() => navigate('/appointments')}
      />
      <DashboardDepartmentQueue departments={departments} />
    </div>
  );
};

export default DashboardPage;