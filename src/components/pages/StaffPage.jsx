import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import StaffGrid from '@/components/organisms/StaffGrid';
import { staffService, departmentService } from '@/services';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';

const StaffPage = () => {
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

  const handleAddStaffMemberClick = () => {
    // Implement logic for adding staff (e.g., open a modal)
    toast.info('Add Staff Member functionality coming soon!');
  };

  if (loading) {
    return (
      <div className="p-6">
        <SkeletonLoader type="grid" count={6} />
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
          <h1 className="text-2xl font-semibold text-surface-900">Staff Directory</h1>
          <p className="text-surface-600">Manage hospital staff and their availability</p>
        </div>
        <Button
          onClick={handleAddStaffMemberClick}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Staff Member
        </Button>
      </div>

      <StaffGrid
        staff={staff}
        departments={departments}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        filterDepartment={filterDepartment}
        setFilterDepartment={setFilterDepartment}
        onAddStaffMemberClick={handleAddStaffMemberClick}
      />
    </div>
  );
};

export default StaffPage;