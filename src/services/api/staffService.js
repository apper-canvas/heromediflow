import staffData from '../mockData/staff.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class StaffService {
  constructor() {
    this.staff = [...staffData];
  }

  async getAll() {
    await delay(300);
    return [...this.staff];
  }

  async getById(id) {
    await delay(200);
    const member = this.staff.find(s => s.id === id);
    return member ? { ...member } : null;
  }

  async create(memberData) {
    await delay(400);
    const newMember = {
      ...memberData,
      id: `STF-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.staff.push(newMember);
    return { ...newMember };
  }

  async update(id, updatedData) {
    await delay(300);
    const index = this.staff.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Staff member not found');
    }
    this.staff[index] = { ...this.staff[index], ...updatedData };
    return { ...this.staff[index] };
  }

  async delete(id) {
    await delay(250);
    const index = this.staff.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Staff member not found');
    }
    this.staff.splice(index, 1);
    return true;
  }
}

export default new StaffService();