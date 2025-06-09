import appointmentsData from '../mockData/appointments.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class AppointmentService {
  constructor() {
    this.appointments = [...appointmentsData];
  }

  async getAll() {
    await delay(250);
    return [...this.appointments];
  }

  async getById(id) {
    await delay(200);
    const appointment = this.appointments.find(a => a.id === id);
    return appointment ? { ...appointment } : null;
  }

  async create(appointmentData) {
    await delay(350);
    const newAppointment = {
      ...appointmentData,
      id: `APT-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.appointments.push(newAppointment);
    return { ...newAppointment };
  }

  async update(id, updatedData) {
    await delay(300);
    const index = this.appointments.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Appointment not found');
    }
    this.appointments[index] = { ...this.appointments[index], ...updatedData };
    return { ...this.appointments[index] };
  }

  async delete(id) {
    await delay(250);
    const index = this.appointments.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Appointment not found');
    }
    this.appointments.splice(index, 1);
    return true;
  }
}

export default new AppointmentService();