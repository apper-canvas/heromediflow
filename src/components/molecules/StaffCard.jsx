import React from 'react';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const StaffCard = ({ member, department, getStatusColor, getStatusIcon, getRoleIcon, index }) => {
  return (
    <Card
      motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05 } }}
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
            <Button className="p-1 hover:bg-surface-100 rounded" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ApperIcon name="Phone" size={16} className="text-surface-600" />
            </Button>
            <Button className="p-1 hover:bg-surface-100 rounded" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ApperIcon name="Mail" size={16} className="text-surface-600" />
            </Button>
            <Button className="p-1 hover:bg-surface-100 rounded" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ApperIcon name="Calendar" size={16} className="text-surface-600" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StaffCard;