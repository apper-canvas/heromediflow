import React from 'react';
import FormField from '@/components/molecules/FormField';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Textarea from '@/components/atoms/Textarea';
import Button from '@/components/atoms/Button';
import Modal from '@/components/molecules/Modal';

const PatientRegistrationForm = ({ isOpen, onClose, formData, handleInputChange, handleSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register New Patient">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Full Name" required>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </FormField>

          <FormField label="Date of Birth" required>
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </FormField>

          <FormField label="Gender" required>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </FormField>

          <FormField label="Phone Number" required>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </FormField>

          <FormField label="Email">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormField>

          <FormField label="Blood Type">
            <Select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleInputChange}
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Select>
          </FormField>
        </div>

        <FormField label="Address">
          <Textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField label="Allergies (comma-separated)">
          <Input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleInputChange}
            placeholder="e.g., Penicillin, Peanuts, Latex"
          />
        </FormField>

        <div>
          <h3 className="text-lg font-medium text-surface-900 mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Name">
              <Input
                type="text"
                name="emergencyContact.name"
                value={formData.emergencyContact.name}
                onChange={handleInputChange}
              />
            </FormField>
            <FormField label="Phone">
              <Input
                type="tel"
                name="emergencyContact.phone"
                value={formData.emergencyContact.phone}
                onChange={handleInputChange}
              />
            </FormField>
            <FormField label="Relationship">
              <Input
                type="text"
                name="emergencyContact.relationship"
                value={formData.emergencyContact.relationship}
                onChange={handleInputChange}
                placeholder="e.g., Spouse, Parent"
              />
            </FormField>
          </div>
        </div>

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
            Register Patient
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PatientRegistrationForm;