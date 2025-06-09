import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';
import { patientService, appointmentService, departmentService } from '../services';
import { toast } from 'react-toastify';

const MainFeature = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedView, setSelectedView] = useState('dashboard');

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

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-surface-200 rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                  <div className="h-4 bg-surface-200 rounded w-1/2"></div>
                </div>
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
          <h3 className="text-lg font-medium text-surface-900 mb-2">Error Loading Data</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadDashboardData}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-full overflow-hidden">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-surface-200"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="Users" className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-surface-600">Total Patients</p>
              <p className="text-2xl font-semibold text-surface-900">{patients.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-surface-200"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="Calendar" className="w-6 h-6 text-accent" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-surface-600">Today's Appointments</p>
              <p className="text-2xl font-semibold text-surface-900">{todaysAppointments.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-surface-200"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="Building2" className="w-6 h-6 text-success" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-surface-600">Active Departments</p>
              <p className="text-2xl font-semibold text-surface-900">{departments.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-surface-200"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="Clock" className="w-6 h-6 text-warning" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-surface-600">Avg Wait Time</p>
              <p className="text-2xl font-semibold text-surface-900">15 min</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Patient Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-surface-200"
      >
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Quick Patient Search</h3>
        <div className="relative mb-4">
          <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input
            type="text"
            placeholder="Search by name, phone, or patient ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"
          />
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
              <div className="text-center py-4">
                <ApperIcon name="UserX" className="w-8 h-8 text-surface-400 mx-auto mb-2" />
                <p className="text-surface-600">No patients found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Today's Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-surface-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-surface-900">Today's Appointments</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
          >
            View All
          </motion.button>
        </div>
        
        {todaysAppointments.length > 0 ? (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {todaysAppointments.slice(0, 5).map((appointment, index) => {
              const patient = patients.find(p => p.id === appointment.patientId);
              return (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-surface-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-surface-900">
                        {new Date(appointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-xs text-surface-600">{appointment.duration} min</p>
                    </div>
                    <div>
                      <p className="font-medium text-surface-900">{patient?.name || 'Unknown Patient'}</p>
                      <p className="text-sm text-surface-600">{appointment.reason}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <ApperIcon name="Calendar" className="w-12 h-12 text-surface-400 mx-auto mb-4" />
            <p className="text-surface-600">No appointments scheduled for today</p>
          </div>
        )}
      </motion.div>

      {/* Department Queue Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-surface-200"
      >
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Department Queue Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((department, index) => (
            <motion.div
              key={department.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-surface-50 rounded-lg hover:bg-surface-100 cursor-pointer transition-colors duration-150"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-surface-900">{department.name}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  department.activeQueue.length === 0 ? 'bg-success' :
                  department.activeQueue.length <= 3 ? 'bg-warning' : 'bg-error'
                }`}></div>
              </div>
              <p className="text-sm text-surface-600 mb-2">{department.location}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-surface-900">
                  {department.activeQueue.length} waiting
                </span>
                <span className="text-sm text-surface-600">
                  ~{department.avgWaitTime}min wait
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MainFeature;