import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';
import { patientService, appointmentService, departmentService } from '../services';
import { toast } from 'react-toastify';

const Reports = () => {
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
        startDate.setDate(now.getDate() - 7);
    }
    
    return appointments.filter(apt => new Date(apt.dateTime) >= startDate);
  };

  const calculateMetrics = () => {
    const rangeAppointments = getAppointmentsInRange(data.appointments, dateRange);
    
    const completedAppointments = rangeAppointments.filter(apt => apt.status === 'completed');
    const cancelledAppointments = rangeAppointments.filter(apt => apt.status === 'cancelled');
    const totalPatients = data.patients.length;
    const newPatients = data.patients.filter(patient => {
      const patientDate = new Date(patient.id); // Assuming ID contains timestamp
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return patientDate >= weekAgo;
    }).length;

    const appointmentsByDepartment = data.departments.map(dept => ({
      name: dept.name,
      count: rangeAppointments.filter(apt => apt.departmentId === dept.id).length,
      avgWaitTime: dept.avgWaitTime
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

  if (loading) {
    return (
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-surface-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-64 bg-surface-200 rounded-lg"></div>
          </div>
        </motion.div>
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
          <h3 className="text-lg font-medium text-surface-900 mb-2">Error Loading Reports</h3>
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
          <h1 className="text-2xl font-semibold text-surface-900">Reports & Analytics</h1>
          <p className="text-surface-600">Hospital performance metrics and insights</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
          >
            <ApperIcon name="Download" size={16} className="mr-2" />
            Export
          </motion.button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-surface-200 mb-6">
        <div className="border-b border-surface-200">
          <nav className="flex space-x-8 px-6">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                  selectedReport === type.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-surface-500 hover:text-surface-700 hover:border-surface-300'
                }`}
              >
                <ApperIcon name={type.icon} size={16} className="mr-2" />
                {type.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overview Report */}
      {selectedReport === 'overview' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-surface-200"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Calendar" className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-surface-600">Total Appointments</p>
                  <p className="text-2xl font-semibold text-surface-900">{metrics.totalAppointments}</p>
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
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="CheckCircle" className="w-6 h-6 text-success" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-surface-600">Completed</p>
                  <p className="text-2xl font-semibold text-surface-900">{metrics.completedAppointments}</p>
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
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Users" className="w-6 h-6 text-accent" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-surface-600">Total Patients</p>
                  <p className="text-2xl font-semibold text-surface-900">{metrics.totalPatients}</p>
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
                  <ApperIcon name="TrendingUp" className="w-6 h-6 text-warning" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-surface-600">Completion Rate</p>
                  <p className="text-2xl font-semibold text-surface-900">{metrics.completionRate}%</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Appointments by Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-surface-200"
            >
              <h3 className="text-lg font-medium text-surface-900 mb-4">Appointments by Status</h3>
              <div className="space-y-4">
                {metrics.appointmentsByStatus.map((item, index) => (
                  <div key={item.status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-4 h-4 rounded-full ${
                          item.status === 'Completed' ? 'bg-success' :
                          item.status === 'Confirmed' ? 'bg-primary' :
                          item.status === 'Scheduled' ? 'bg-info' : 'bg-error'
                        }`}
                      ></div>
                      <span className="text-surface-900">{item.status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-surface-900 font-medium">{item.count}</span>
                      <div className="w-20 bg-surface-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.status === 'Completed' ? 'bg-success' :
                            item.status === 'Confirmed' ? 'bg-primary' :
                            item.status === 'Scheduled' ? 'bg-info' : 'bg-error'
                          }`}
                          style={{
                            width: metrics.totalAppointments > 0 
                              ? `${(item.count / metrics.totalAppointments) * 100}%` 
                              : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Department Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-surface-200"
            >
              <h3 className="text-lg font-medium text-surface-900 mb-4">Department Activity</h3>
              <div className="space-y-4">
                {metrics.appointmentsByDepartment
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5)
                  .map((dept, index) => (
                  <div key={dept.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-surface-900 font-medium">{dept.name}</span>
                      <span className="text-surface-600">{dept.count} appointments</span>
                    </div>
                    <div className="w-full bg-surface-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: metrics.totalAppointments > 0 
                            ? `${(dept.count / metrics.totalAppointments) * 100}%` 
                            : '0%'
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-surface-500">
                      <span>Avg wait: {dept.avgWaitTime} min</span>
                      <span>{metrics.totalAppointments > 0 
                        ? Math.round((dept.count / metrics.totalAppointments) * 100) 
                        : 0}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Other report types would be implemented similarly */}
      {selectedReport !== 'overview' && (
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

export default Reports;