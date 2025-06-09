class PatientService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'patient';
    this.allFields = [
      'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
      'date_of_birth', 'gender', 'phone', 'email', 'address', 'blood_type', 
      'allergies', 'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relationship'
    ];
    this.updateableFields = [
      'Name', 'date_of_birth', 'gender', 'phone', 'email', 'address', 'blood_type',
      'allergies', 'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relationship'
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
      console.error('Error fetching patients:', error);
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
      console.error(`Error fetching patient with ID ${id}:`, error);
      throw error;
    }
  }

  async create(patientData) {
    try {
      const params = {
        records: [{
          Name: patientData.name || patientData.Name,
          date_of_birth: patientData.dateOfBirth || patientData.date_of_birth,
          gender: patientData.gender,
          phone: patientData.phone,
          email: patientData.email,
          address: patientData.address,
          blood_type: patientData.bloodType || patientData.blood_type,
          allergies: patientData.allergies,
          emergency_contact_name: patientData.emergencyContact?.name || patientData.emergency_contact_name,
          emergency_contact_phone: patientData.emergencyContact?.phone || patientData.emergency_contact_phone,
          emergency_contact_relationship: patientData.emergencyContact?.relationship || patientData.emergency_contact_relationship
        }]
      };
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response.results?.[0]?.data || null;
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  }
}

export default new PatientService();