import departmentsData from '../mockData/departments.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class DepartmentService {
  constructor() {
    this.departments = [...departmentsData];
  }

  async getAll() {
    await delay(280);
    return [...this.departments];
  }

  async getById(id) {
    await delay(200);
    const department = this.departments.find(d => d.id === id);
    return department ? { ...department } : null;
  }

  async create(departmentData) {
    await delay(350);
    const newDepartment = {
      ...departmentData,
      id: `DEPT-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.departments.push(newDepartment);
    return { ...newDepartment };
  }

  async update(id, updatedData) {
    await delay(300);
    const index = this.departments.findIndex(d => d.id === id);
    if (index === -1) {
      throw new Error('Department not found');
    }
    this.departments[index] = { ...this.departments[index], ...updatedData };
    return { ...this.departments[index] };
  }

  async delete(id) {
    await delay(250);
    const index = this.departments.findIndex(d => d.id === id);
    if (index === -1) {
      throw new Error('Department not found');
    }
    this.departments.splice(index, 1);
    return true;
  }
}

export default new DepartmentService();