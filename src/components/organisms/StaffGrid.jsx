import React from 'react';
import SearchBar from '@/components/molecules/SearchBar';
import Select from '@/components/atoms/Select';
import StaffCard from '@/components/molecules/StaffCard';
import EmptyState from '@/components/atoms/EmptyState';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';

const StaffGrid = ({
  staff,
  departments,
  searchTerm,
  setSearchTerm,
  filterRole,
  setFilterRole,
  filterDepartment,
  setFilterDepartment,
  onAddStaffMemberClick
}) => {
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

  return (
    <>
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search staff..." />

          <Select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="">All Roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </Select>

          <Select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </Select>
        </div>
      </Card>

      {filteredStaff.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member, index) => {
            const department = departments.find(d => d.id === member.departmentId);
            return (
              <StaffCard
                key={member.id}
                member={member}
                department={department}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
                getRoleIcon={getRoleIcon}
                index={index}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="Users"
          title={searchTerm || filterRole || filterDepartment ? 'No staff found' : 'No staff members yet'}
          message={
            searchTerm || filterRole || filterDepartment
              ? 'Try adjusting your search criteria'
              : 'Add staff members to get started'
          }
        >
          {!searchTerm && !filterRole && !filterDepartment && (
            <Button
              onClick={onAddStaffMemberClick}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add First Staff Member
            </Button>
          )}
        </EmptyState>
      )}
    </>
  );
};

export default StaffGrid;