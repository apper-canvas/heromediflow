import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';
import { appointmentService, patientService, staffService } from '../services';
import { toast } from 'react-toastify';

const Appointments = () => {
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
    departmentId: '',
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
      const newAppointment = await appointmentService.create({
        ...formData,
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
        return aptDate >= weekStart && aptDate <= weekEnd;
      } else {
        return aptDate.getMonth() === today.getMonth() && aptDate.getFullYear() === today.getFullYear();
      }
    });
  };

  const filteredAppointments = getFilteredAppointments();

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="animate-pulse space-y-3">
                <div className="h-6 bg-surface-200 rounded w-1/3"></div>
                <div className="h-4 bg-surface-200 rounded w-1/2"></div>
                <div className="h-4 bg-surface-200 rounded w-3/4"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-lg shadow-sm p-8 text-center"
        >
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Error Loading Appointments</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadData}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
          >
            Try Again
          </motion.button>
        </motion.div>
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
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAppointmentForm(true)}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Schedule Appointment
        </motion.button>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-surface-200 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex bg-surface-100 rounded-lg">
              {['day', 'week', 'month'].map((view) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    currentView === view
                      ? 'bg-primary text-white'
                      : 'text-surface-600 hover:text-surface-900'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const prev = new Date(selectedDate);
                  prev.setDate(prev.getDate() - 1);
                  setSelectedDate(prev);
                }}
                className="p-2 hover:bg-surface-100 rounded-lg transition-colors duration-150"
              >
                <ApperIcon name="ChevronLeft" size={16} />
              </motion.button>
              <span className="text-lg font-medium text-surface-900 min-w-[200px] text-center">
                {currentView === 'day' && selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                {currentView === 'week' && `Week of ${selectedDate.toLocaleDateString()}`}
                {currentView === 'month' && selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const next = new Date(selectedDate);
                  next.setDate(next.getDate() + 1);
                  setSelectedDate(next);
                }}
                className="p-2 hover:bg-surface-100 rounded-lg transition-colors duration-150"
              >
                <ApperIcon name="ChevronRight" size={16} />
              </motion.button>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDate(new Date())}
            className="px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors duration-150"
          >
            Today
          </motion.button>
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length > 0 ? (
        <div className="space-y-4">
          {filteredAppointments
            .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
            .map((appointment, index) => {
              const patient = patients.find(p => p.id === appointment.patientId);
              const doctor = staff.find(s => s.id === appointment.doctorId);
              return (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-lg shadow-sm p-6 border border-surface-200 hover:border-primary cursor-pointer transition-all duration-150"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-center min-w-[80px]">
                        <p className="text-lg font-semibold text-surface-900">
                          {new Date(appointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-surface-600">{appointment.duration} min</p>
                      </div>
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <ApperIcon name="User" size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-surface-900">{patient?.name || 'Unknown Patient'}</h3>
                        <p className="text-surface-600">{appointment.reason}</p>
                        <p className="text-sm text-surface-500">Dr. {doctor?.name || 'Unknown Doctor'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      {appointment.notes && (
                        <p className="text-sm text-surface-500 mt-2 max-w-[200px] truncate">{appointment.notes}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-lg shadow-sm p-12 text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="Calendar" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-lg font-medium text-surface-900 mb-2">No appointments scheduled</h3>
          <p className="text-surface-600 mb-4">
            No appointments found for the selected {currentView}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAppointmentForm(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
          >
            Schedule First Appointment
          </motion.button>
        </motion.div>
      )}

      {/* Appointment Form Modal */}
      <AnimatePresence>
        {showAppointmentForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowAppointmentForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-surface-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-surface-900">Schedule Appointment</h2>
                    <button
                      onClick={() => setShowAppointmentForm(false)}
                      className="p-2 hover:bg-surface-100 rounded-lg transition-colors duration-150"
                    >
                      <ApperIcon name="X" size={20} />
                    </button>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Patient *
                    </label>
                    <select
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"
                    >
                      <option value="">Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name} - {patient.phone}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Doctor *
                    </label>
                    <select
                      name="doctorId"
                      value={formData.doctorId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"
                    >
                      <option value="">Select Doctor</option>
                      {staff.filter(s => s.role === 'Doctor').map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          Dr. {doctor.name} - {doctor.specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Date & Time *
                      </label>
                      <input
                        type="datetime-local"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Duration (minutes) *
                      </label>
                      <select
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="90">1.5 hours</option>
                        <option value="120">2 hours</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Reason for Visit *
                    </label>
                    <input
                      type="text"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Routine checkup, Follow-up, Consultation"
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Additional notes or special instructions"
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAppointmentForm(false)}
                      className="px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors duration-150"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
                    >
                      Schedule Appointment
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Appointments;