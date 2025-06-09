class AppointmentService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'appointment';
    this.allFields = [
      'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
      'date_time', 'duration', 'reason', 'notes', 'status', 'patient_id', 'doctor_id', 'department_id'
    ];
    this.updateableFields = [
      'Name', 'date_time', 'duration', 'reason', 'notes', 'status', 'patient_id', 'doctor_id', 'department_id'
    ];
  }

  async getAll() {
    try {
      const params = {
        fields: this.allFields
      };
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      return response?.data || [];
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: this.allFields
      };
      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      return response?.data || null;
    } catch (error) {
      console.error(`Error fetching appointment with ID ${id}:`, error);
      throw error;
    }
  }

  async create(appointmentData) {
    try {
      const params = {
        records: [{
          Name: appointmentData.reason || appointmentData.Name || 'Appointment',
          date_time: appointmentData.dateTime || appointmentData.date_time,
          duration: parseInt(appointmentData.duration) || 30,
          reason: appointmentData.reason,
          notes: appointmentData.notes,
          status: appointmentData.status || 'scheduled',
          patient_id: parseInt(appointmentData.patientId) || parseInt(appointmentData.patient_id),
          doctor_id: parseInt(appointmentData.doctorId) || parseInt(appointmentData.doctor_id),
          department_id: parseInt(appointmentData.departmentId) || parseInt(appointmentData.department_id)
        }]
      };
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response.results?.[0]?.data || null;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }
}

export default new AppointmentService();