import React from 'react';
import AppointmentItem from '@/components/molecules/AppointmentItem';
import EmptyState from '@/components/atoms/EmptyState';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const AppointmentOverviewList = ({
  appointments,
  patients,
  staff,
  currentView,
  getStatusColor,
  onScheduleAppointmentClick
}) => {
  return (
    <>
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments
            .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
            .map((appointment, index) => {
              const patient = patients.find(p => p.id === appointment.patientId);
              const doctor = staff.find(s => s.id === appointment.doctorId);
              return (
                <AppointmentItem
                  key={appointment.id}
                  appointment={appointment}
                  patient={patient}
                  doctor={doctor}
                  getStatusColor={getStatusColor}
                  index={index}
                />
              );
            })}
        </div>
      ) : (
        <EmptyState
          icon="Calendar"
          title="No appointments scheduled"
          message={`No appointments found for the selected ${currentView}`}
        >
          <Button
            onClick={onScheduleAppointmentClick}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule First Appointment
          </Button>
        </EmptyState>
      )}
    </>
  );
};

export default AppointmentOverviewList;