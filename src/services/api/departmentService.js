class DepartmentService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'department';
    this.allFields = [
      'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
      'description', 'phone', 'email'
    ];
    this.updateableFields = [
      'Name', 'description', 'phone', 'email'
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
      console.error('Error fetching departments:', error);
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
      console.error(`Error fetching department with ID ${id}:`, error);
      throw error;
    }
  }

  async create(departmentData) {
    try {
      const params = {
        records: [{
          Name: departmentData.name || departmentData.Name,
          description: departmentData.description,
          phone: departmentData.phone,
          email: departmentData.email
        }]
      };
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response.results?.[0]?.data || null;
    } catch (error) {
      console.error('Error creating department:', error);
      throw error;
    }
  }
}

export default new DepartmentService();