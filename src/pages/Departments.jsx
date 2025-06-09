import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';
import { departmentService, staffService } from '../services';
import { toast } from 'react-toastify';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [departmentsData, staffData] = await Promise.all([
        departmentService.getAll(),
        staffService.getAll()
      ]);
      setDepartments(departmentsData);
      setStaff(staffData);
    } catch (err) {
      setError(err.message || 'Failed to load departments');
      toast.error('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const getDepartmentIcon = (name) => {
    const iconMap = {
      'Emergency': 'AlertTriangle',
      'Cardiology': 'Heart',
      'Neurology': 'Brain',
      'Pediatrics': 'Baby',
      'Orthopedics': 'Bone',
      'Radiology': 'Scan',
      'Laboratory': 'TestTube',
      'Surgery': 'Scissors',
      'ICU': 'MonitorSpeaker',
      'Pharmacy': 'Pill'
    };
    return iconMap[name] || 'Building2';
  };

  const getQueueStatus = (queueLength) => {
    if (queueLength === 0) return { color: 'bg-success', text: 'No Wait', icon: 'CheckCircle' };
    if (queueLength <= 3) return { color: 'bg-warning', text: 'Short Wait', icon: 'Clock' };
    if (queueLength <= 6) return { color: 'bg-orange-500', text: 'Moderate Wait', icon: 'Clock3' };
    return { color: 'bg-error', text: 'Long Wait', icon: 'AlertCircle' };
  };

  const getDepartmentStaff = (departmentId) => {
    return staff.filter(member => member.departmentId === departmentId);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="animate-pulse space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-surface-200 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-surface-200 rounded w-32"></div>
                    <div className="h-4 bg-surface-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-surface-200 rounded w-full"></div>
                  <div className="h-4 bg-surface-200 rounded w-3/4"></div>
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
          <h3 className="text-lg font-medium text-surface-900 mb-2">Error Loading Departments</h3>
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
          <h1 className="text-2xl font-semibold text-surface-900">Departments</h1>
          <p className="text-surface-600">Monitor department queues and staff allocation</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Department
        </motion.button>
      </div>

      {/* Departments Grid */}
      {departments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department, index) => {
            const queueStatus = getQueueStatus(department.activeQueue.length);
            const departmentStaff = getDepartmentStaff(department.id);
            const availableStaff = departmentStaff.filter(member => member.currentStatus === 'available');
            
            return (
              <motion.div
                key={department.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedDepartment(department)}
                className="bg-white rounded-lg shadow-sm p-6 border border-surface-200 hover:border-primary cursor-pointer transition-all duration-150"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ApperIcon name={getDepartmentIcon(department.name)} size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-surface-900">{department.name}</h3>
                      <p className="text-sm text-surface-600">{department.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name={queueStatus.icon} size={16} className={`text-white`} />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${queueStatus.color}`}>
                      {queueStatus.text}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-surface-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <ApperIcon name="Users" className="w-5 h-5 text-surface-600 mr-1" />
                        <span className="text-xl font-semibold text-surface-900">
                          {department.activeQueue.length}
                        </span>
                      </div>
                      <p className="text-sm text-surface-600">Waiting</p>
                    </div>
                    
                    <div className="text-center p-3 bg-surface-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <ApperIcon name="Clock" className="w-5 h-5 text-surface-600 mr-1" />
                        <span className="text-xl font-semibold text-surface-900">
                          {department.avgWaitTime}
                        </span>
                      </div>
                      <p className="text-sm text-surface-600">Avg Wait (min)</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-surface-600">Staff Status</span>
                      <span className="text-sm text-surface-500">
                        {availableStaff.length}/{departmentStaff.length} available
                      </span>
                    </div>
                    <div className="w-full bg-surface-200 rounded-full h-2">
                      <div
                        className="bg-success h-2 rounded-full transition-all duration-300"
                        style={{
                          width: departmentStaff.length > 0 
                            ? `${(availableStaff.length / departmentStaff.length) * 100}%` 
                            : '0%'
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-surface-600 mb-2">Department Head</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <ApperIcon name="User" size={12} className="text-white" />
                      </div>
                      <span className="text-sm text-surface-900">{department.head}</span>
                    </div>
                  </div>
                </div>

                {department.activeQueue.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-surface-200">
                    <p className="text-sm font-medium text-surface-600 mb-2">Current Queue</p>
                    <div className="space-y-1">
                      {department.activeQueue.slice(0, 3).map((patient, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-surface-900">#{patient.number} - {patient.name}</span>
                          <span className="text-surface-500">{patient.waitTime}min</span>
                        </div>
                      ))}
                      {department.activeQueue.length > 3 && (
                        <p className="text-xs text-surface-500">
                          +{department.activeQueue.length - 3} more patients
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-150"
                    >
                      <ApperIcon name="Eye" size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors duration-150"
                    >
                      <ApperIcon name="Users" size={16} />
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150"
                  >
                    Manage Queue
                  </motion.button>
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
            <ApperIcon name="Building2" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-lg font-medium text-surface-900 mb-2">No departments yet</h3>
          <p className="text-surface-600 mb-4">Create your first department to get started</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
          >
            Create First Department
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Departments;