import React from 'react';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const DepartmentCard = ({ department, staff, getDepartmentIcon, getQueueStatus, index, onClick }) => {
  const queueStatus = getQueueStatus(department.activeQueue.length);
  const departmentStaff = staff.filter(member => member.departmentId === department.id);
  const availableStaff = departmentStaff.filter(member => member.currentStatus === 'available');

  return (
    <Card
      onClick={() => onClick(department)}
      motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 } }}
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
          <Button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ApperIcon name="Eye" size={16} />
          </Button>
          <Button className="p-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ApperIcon name="Users" size={16} />
          </Button>
        </div>
        <Button className="text-sm text-primary hover:text-primary/80 font-medium" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Manage Queue
        </Button>
      </div>
    </Card>
  );
};

export default DepartmentCard;