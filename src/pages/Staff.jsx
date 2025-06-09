import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';
import { staffService, departmentService } from '../services';
import { toast } from 'react-toastify';

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [staffData, departmentsData] = await Promise.all([
        staffService.getAll(),
        departmentService.getAll()
      ]);
      setStaff(staffData);
      setDepartments(departmentsData);
    } catch (err) {
      setError(err.message || 'Failed to load staff data');
      toast.error('Failed to load staff data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-success text-white';
      case 'busy': return 'bg-warning text-white';
      case 'unavailable': return 'bg-error text-white';
      case 'off-duty': return 'bg-surface-400 text-white';
      default: return 'bg-surface-400 text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return 'CheckCircle';
      case 'busy': return 'Clock';
      case 'unavailable': return 'XCircle';
      case 'off-duty': return 'Moon';
      default: return 'Circle';
    }
  };

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case 'doctor': return 'Stethoscope';
      case 'nurse': return 'Heart';
      case 'technician': return 'Wrench';
      case 'administrator': return 'Briefcase';
      case 'support': return 'HeadphonesIcon';
      default: return 'User';
    }
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || member.role === filterRole;
    const matchesDepartment = !filterDepartment || member.departmentId === filterDepartment;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });

  const uniqueRoles = [...new Set(staff.map(member => member.role))];

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
                  <div className="w-12 h-12 bg-surface-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-surface-200 rounded w-24"></div>
                    <div className="h-3 bg-surface-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-surface-200 rounded w-full"></div>
                  <div className="h-3 bg-surface-200 rounded w-3/4"></div>
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
          <h3 className="text-lg font-medium text-surface-900 mb-2">Error Loading Staff</h3>
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
          <h1 className="text-2xl font-semibold text-surface-900">Staff Directory</h1>
          <p className="text-surface-600">Manage hospital staff and their availability</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Staff Member
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-surface-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="w-full px-3 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"
          >
            <option value="">All Roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="w-full px-3 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Staff Grid */}
      {filteredStaff.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member, index) => {
            const department = departments.find(d => d.id === member.departmentId);
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-sm p-6 border border-surface-200 hover:border-primary cursor-pointer transition-all duration-150"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <ApperIcon name={getRoleIcon(member.role)} size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-surface-900">{member.name}</h3>
                      <p className="text-sm text-surface-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ApperIcon 
                      name={getStatusIcon(member.currentStatus)} 
                      size={16} 
                      className={`${member.currentStatus === 'available' ? 'text-success' : 
                                  member.currentStatus === 'busy' ? 'text-warning' : 
                                  member.currentStatus === 'unavailable' ? 'text-error' : 'text-surface-400'}`} 
                    />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.currentStatus)}`}>
                      {member.currentStatus}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-surface-600">Specialization</p>
                    <p className="text-surface-900">{member.specialization}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-surface-600">Department</p>
                    <p className="text-surface-900">{department?.name || 'Unknown'}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-surface-600">Phone</p>
                      <p className="text-surface-900 text-sm">{member.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-600">Email</p>
                      <p className="text-surface-900 text-sm truncate">{member.email}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-surface-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-surface-600">Today's Schedule</span>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1 hover:bg-surface-100 rounded transition-colors duration-150"
                      >
                        <ApperIcon name="Phone" size={16} className="text-surface-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1 hover:bg-surface-100 rounded transition-colors duration-150"
                      >
                        <ApperIcon name="Mail" size={16} className="text-surface-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1 hover:bg-surface-100 rounded transition-colors duration-150"
                      >
                        <ApperIcon name="Calendar" size={16} className="text-surface-600" />
                      </motion.button>
                    </div>
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
            <ApperIcon name="Users" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-lg font-medium text-surface-900 mb-2">
            {searchTerm || filterRole || filterDepartment ? 'No staff found' : 'No staff members yet'}
          </h3>
          <p className="text-surface-600 mb-4">
            {searchTerm || filterRole || filterDepartment 
              ? 'Try adjusting your search criteria'
              : 'Add staff members to get started'
            }
          </p>
          {!searchTerm && !filterRole && !filterDepartment && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
            >
              Add First Staff Member
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Staff;