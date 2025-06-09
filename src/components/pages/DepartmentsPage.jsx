import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import DepartmentGrid from '@/components/organisms/DepartmentGrid';
import { departmentService, staffService } from '@/services';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null); // To handle potential modal for details

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

  const handleAddDepartmentClick = () => {
    // Implement logic for adding a department (e.g., open a modal)
    toast.info('Add Department functionality coming soon!');
  };

  const handleDepartmentCardClick = (department) => {
    setSelectedDepartment(department);
    // Implement logic for viewing department details (e.g., open a modal or navigate)
    toast.info(`Viewing details for ${department.name}`);
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
          <h1 className="text-2xl font-semibold text-surface-900">Departments</h1>
          <p className="text-surface-600">Monitor department queues and staff allocation</p>
        </div>
        <Button
          onClick={handleAddDepartmentClick}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Department
        </Button>
      </div>

      <DepartmentGrid
        departments={departments}
        staff={staff}
        onAddDepartmentClick={handleAddDepartmentClick}
        onDepartmentClick={handleDepartmentCardClick}
      />

      {/* Optionally, a modal for selectedDepartment details */}
      {/* {selectedDepartment && (
        <Modal isOpen={!!selectedDepartment} onClose={() => setSelectedDepartment(null)} title={selectedDepartment.name}>
          <div className="p-6">
            <p>Location: {selectedDepartment.location}</p>
            <p>Head: {selectedDepartment.head}</p>
            <p>Queue Length: {selectedDepartment.activeQueue.length}</p>
          </div>
        </Modal>
      )} */}
    </div>
  );
};

export default DepartmentsPage;