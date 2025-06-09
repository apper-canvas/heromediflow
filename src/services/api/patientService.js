import patientsData from '../mockData/patients.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PatientService {
  constructor() {
    this.patients = [...patientsData];
  }

  async getAll() {
    await delay(300);
    return [...this.patients];
  }

  async getById(id) {
    await delay(200);
    const patient = this.patients.find(p => p.id === id);
    return patient ? { ...patient } : null;
  }

  async create(patientData) {
    await delay(400);
    const newPatient = {
      ...patientData,
      id: `PAT-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.patients.push(newPatient);
    return { ...newPatient };
  }

  async update(id, updatedData) {
    await delay(300);
    const index = this.patients.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Patient not found');
    }
    this.patients[index] = { ...this.patients[index], ...updatedData };
    return { ...this.patients[index] };
  }

  async delete(id) {
    await delay(250);
    const index = this.patients.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Patient not found');
    }
    this.patients.splice(index, 1);
    return true;
  }
}

export default new PatientService();