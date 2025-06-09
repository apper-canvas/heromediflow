import React from 'react';
import FormField from '@/components/molecules/FormField';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Textarea from '@/components/atoms/Textarea';
import Button from '@/components/atoms/Button';
import Modal from '@/components/molecules/Modal';

const AppointmentForm = ({ isOpen, onClose, patients, staff, formData, handleInputChange, handleSubmit }) => {
  const doctors = staff.filter(s => s.role === 'Doctor');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Appointment">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <FormField label="Patient" required>
          <Select
            name="patientId"
            value={formData.patientId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.name} - {patient.phone}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Doctor" required>
          <Select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </Select>
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Date & Time" required>
            <Input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleInputChange}
              required
            />
          </FormField>

          <FormField label="Duration (minutes)" required>
            <Select
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </Select>
          </FormField>
        </div>

        <FormField label="Reason for Visit" required>
          <Input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            required
            placeholder="e.g., Routine checkup, Follow-up, Consultation"
          />
        </FormField>

        <FormField label="Notes">
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Additional notes or special instructions"
          />
        </FormField>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Appointment
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AppointmentForm;