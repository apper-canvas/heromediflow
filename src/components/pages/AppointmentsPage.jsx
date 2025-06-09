import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import AppointmentForm from '@/components/organisms/AppointmentForm';
import AppointmentCalendarControls from '@/components/organisms/AppointmentCalendarControls';
import AppointmentOverviewList from '@/components/organisms/AppointmentOverviewList';
import { appointmentService, patientService, staffService } from '@/services';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    departmentId: '', // Added departmentId, ensure it's handled in mock services
    dateTime: '',
    duration: 30,
    reason: '',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [appointmentsData, patientsData, staffData] = await Promise.all([
        appointmentService.getAll(),
        patientService.getAll(),
        staffService.getAll()
      ]);
      setAppointments(appointmentsData);
      setPatients(patientsData);
      setStaff(staffData);
    } catch (err) {
      setError(err.message || 'Failed to load appointments');
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Find the departmentId from the selected doctor's department
      const selectedDoctor = staff.find(s => s.id === formData.doctorId);
      const newAppointment = await appointmentService.create({
        ...formData,
        departmentId: selectedDoctor?.departmentId || '', // Ensure departmentId is set
        status: 'scheduled'
      });
      setAppointments(prev => [...prev, newAppointment]);
      setShowAppointmentForm(false);
      setFormData({
        patientId: '',
        doctorId: '',
        departmentId: '',
        dateTime: '',
        duration: 30,
        reason: '',
        notes: ''
      });
      toast.success('Appointment scheduled successfully');
    } catch (err) {
      toast.error('Failed to schedule appointment');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const getFilteredAppointments = () => {
    const today = new Date(selectedDate);
    return appointments.filter(apt => {
      const aptDate = new Date(apt.dateTime);
      if (currentView === 'day') {
        return aptDate.toDateString() === today.toDateString();
      } else if (currentView === 'week') {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        // Correctly compare dates: aptDate should be within [weekStart, weekEnd] inclusive
        return aptDate >= weekStart && aptDate <= weekEnd;
      } else { // month
        return aptDate.getMonth() === today.getMonth() && aptDate.getFullYear() === today.getFullYear();
      }
    });
  };

  const filteredAppointments = getFilteredAppointments();

  if (loading) {
    return (
      <div className="p-6">
        <SkeletonLoader type="list" count={5} />
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-surface-900">Appointments</h1>
          <p className="text-surface-600">Schedule and manage patient appointments</p>
        </div>
        <Button
          onClick={() => setShowAppointmentForm(true)}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Schedule Appointment
        </Button>
      </div>

      <AppointmentCalendarControls
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <AppointmentOverviewList
        appointments={filteredAppointments}
        patients={patients}
        staff={staff}
        currentView={currentView}
        getStatusColor={getStatusColor}
        onScheduleAppointmentClick={() => setShowAppointmentForm(true)}
      />

      <AppointmentForm
        isOpen={showAppointmentForm}
        onClose={() => setShowAppointmentForm(false)}
        patients={patients}
        staff={staff}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AppointmentsPage;