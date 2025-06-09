import React from 'react';
import DepartmentCard from '@/components/molecules/DepartmentCard';
import EmptyState from '@/components/atoms/EmptyState';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const DepartmentGrid = ({ departments, staff, onAddDepartmentClick, onDepartmentClick }) => {
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

  return (
    <>
      {departments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department, index) => (
            <DepartmentCard
              key={department.id}
              department={department}
              staff={staff}
              getDepartmentIcon={getDepartmentIcon}
              getQueueStatus={getQueueStatus}
              index={index}
              onClick={onDepartmentClick}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="Building2"
          title="No departments yet"
          message="Create your first department to get started"
        >
          <Button
            onClick={onAddDepartmentClick}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create First Department
          </Button>
        </EmptyState>
      )}
    </>
  );
};

export default DepartmentGrid;