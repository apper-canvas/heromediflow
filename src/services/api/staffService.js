class StaffService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'staff';
    this.allFields = [
      'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
      'department_id', 'role', 'phone', 'email'
    ];
    this.updateableFields = [
      'Name', 'department_id', 'role', 'phone', 'email'
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
      console.error('Error fetching staff:', error);
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
      console.error(`Error fetching staff member with ID ${id}:`, error);
      throw error;
    }
  }

  async create(staffData) {
    try {
      const params = {
        records: [{
          Name: staffData.name || staffData.Name,
          department_id: parseInt(staffData.departmentId) || parseInt(staffData.department_id),
          role: staffData.role,
          phone: staffData.phone,
          email: staffData.email
        }]
      };
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response.results?.[0]?.data || null;
    } catch (error) {
      console.error('Error creating staff member:', error);
      throw error;
    }
  }
}

export default new StaffService();