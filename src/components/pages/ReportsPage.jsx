import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import ReportsHeader from '@/components/organisms/ReportsHeader';
import ReportsTabs from '@/components/organisms/ReportsTabs';
import ReportOverviewContent from '@/components/organisms/ReportOverviewContent';
import { patientService, appointmentService, departmentService } from '@/services';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';

const ReportsPage = () => {
  const [data, setData] = useState({
    patients: [],
    appointments: [],
    departments: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('week');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [patients, appointments, departments] = await Promise.all([
        patientService.getAll(),
        appointmentService.getAll(),
        departmentService.getAll()
      ]);
      setData({ patients, appointments, departments });
    } catch (err) {
      setError(err.message || 'Failed to load report data');
      toast.error('Failed to load report data');
    } finally {
      setLoading(false);
    }
  };

  const getAppointmentsInRange = (appointments, range) => {
    const now = new Date();
    const startDate = new Date();

    switch (range) {
      case 'day':
        startDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 7); // Default to last week
    }

    return appointments.filter(apt => new Date(apt.dateTime) >= startDate);
  };

  const calculateMetrics = () => {
    const rangeAppointments = getAppointmentsInRange(data.appointments, dateRange);

    const completedAppointments = rangeAppointments.filter(apt => apt.status === 'completed');
    const cancelledAppointments = rangeAppointments.filter(apt => apt.status === 'cancelled');
    const totalPatients = data.patients.length;
    // Assuming patient ID is related to creation date for 'new patients'
    const newPatients = data.patients.filter(patient => {
      const patientDate = new Date(patient.id);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return patientDate >= weekAgo;
    }).length;

    const appointmentsByDepartment = data.departments.map(dept => ({
      name: dept.name,
      count: rangeAppointments.filter(apt => apt.departmentId === dept.id).length,
      avgWaitTime: dept.avgWaitTime // Assuming avgWaitTime is available in department data
    }));

    const appointmentsByStatus = [
      { status: 'Completed', count: completedAppointments.length },
      { status: 'Scheduled', count: rangeAppointments.filter(apt => apt.status === 'scheduled').length },
      { status: 'Confirmed', count: rangeAppointments.filter(apt => apt.status === 'confirmed').length },
      { status: 'Cancelled', count: cancelledAppointments.length }
    ];

    return {
      totalAppointments: rangeAppointments.length,
      completedAppointments: completedAppointments.length,
      cancelledAppointments: cancelledAppointments.length,
      totalPatients,
      newPatients,
      appointmentsByDepartment,
      appointmentsByStatus,
      completionRate: rangeAppointments.length > 0 ?
        Math.round((completedAppointments.length / rangeAppointments.length) * 100) : 0
    };
  };

  const metrics = calculateMetrics();

  const reportTypes = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'appointments', label: 'Appointments', icon: 'Calendar' },
    { id: 'departments', label: 'Departments', icon: 'Building2' },
    { id: 'patients', label: 'Patients', icon: 'Users' }
  ];

  const handleExportClick = () => {
    toast.info('Export functionality coming soon!');
  };

  if (loading) {
    return (
      <div className="p-6">
        <SkeletonLoader type="report" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage message={error} onRetry={loadData} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full overflow-hidden">
      <ReportsHeader dateRange={dateRange} setDateRange={setDateRange} onExportClick={handleExportClick} />
      <ReportsTabs selectedReport={selectedReport} setSelectedReport={setSelectedReport} reportTypes={reportTypes} />

      {selectedReport === 'overview' ? (
        <ReportOverviewContent metrics={metrics} />
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm p-12 text-center"
        >
          <ApperIcon name="BarChart3" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">
            {reportTypes.find(r => r.id === selectedReport)?.label} Report
          </h3>
          <p className="text-surface-600">
            Detailed {selectedReport} analytics coming soon
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ReportsPage;