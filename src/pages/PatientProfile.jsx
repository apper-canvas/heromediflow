import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';
import { patientService, appointmentService } from '../services';
import { toast } from 'react-toastify';

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadPatientData();
  }, [id]);

  const loadPatientData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [patientData, appointmentsData] = await Promise.all([
        patientService.getById(id),
        appointmentService.getAll()
      ]);
      
      if (!patientData) {
        setError('Patient not found');
        return;
      }
      
      setPatient(patientData);
      setAppointments(appointmentsData.filter(apt => apt.patientId === id));
    } catch (err) {
      setError(err.message || 'Failed to load patient data');
      toast.error('Failed to load patient data');
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'scheduled': return 'bg-info text-white';
      case 'confirmed': return 'bg-success text-white';
      case 'in-progress': return 'bg-warning text-white';
      case 'completed': return 'bg-surface-600 text-white';
      case 'cancelled': return 'bg-error text-white';
      default: return 'bg-surface-400 text-white';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="animate-pulse space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-surface-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-6 bg-surface-200 rounded w-48"></div>
                <div className="h-4 bg-surface-200 rounded w-32"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-surface-200 rounded w-full"></div>
              <div className="h-4 bg-surface-200 rounded w-3/4"></div>
              <div className="h-4 bg-surface-200 rounded w-1/2"></div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-lg shadow-sm p-8 text-center"
        >
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Error Loading Patient</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadPatientData}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
            >
              Try Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/patients')}
              className="px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors duration-150"
            >
              Back to Patients
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!patient) {
    return null;
  }

  return (
    <div className="p-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/patients')}
            className="p-2 hover:bg-surface-100 rounded-lg transition-colors duration-150"
          >
            <ApperIcon name="ArrowLeft" size={20} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-semibold text-surface-900">Patient Profile</h1>
            <p className="text-surface-600">View and manage patient information</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
        >
          <ApperIcon name="Calendar" size={16} className="mr-2" />
          Schedule Appointment
        </motion.button>
      </div>

      {/* Patient Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-surface-200 mb-6"
      >
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <ApperIcon name="User" size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-surface-900">{patient.name}</h2>
            <div className="flex items-center space-x-6 mt-2 text-surface-600">
              <span>Age: {calculateAge(patient.dateOfBirth)}</span>
              <span>•</span>
              <span>{patient.gender}</span>
              <span>•</span>
              <span>ID: {patient.id}</span>
            </div>
            <div className="flex items-center space-x-6 mt-1 text-surface-600">
              <span>{patient.phone}</span>
              {patient.email && (
                <>
                  <span>•</span>
                  <span>{patient.email}</span>
                </>
              )}
            </div>
          </div>
          {patient.bloodType && (
            <div className="text-center">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center">
                <ApperIcon name="Droplets" className="w-8 h-8 text-error" />
              </div>
              <p className="text-sm font-medium text-surface-900 mt-2">{patient.bloodType}</p>
            </div>
          )}
        </div>

        {patient.allergies && patient.allergies.length > 0 && (
          <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-2">
              <ApperIcon name="AlertTriangle" className="w-5 h-5 text-warning" />
              <span className="font-medium text-warning">Allergies:</span>
              <span className="text-surface-900">{patient.allergies.join(', ')}</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-surface-200">
        <div className="border-b border-surface-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: 'User' },
              { id: 'appointments', label: 'Appointments', icon: 'Calendar' },
              { id: 'medical', label: 'Medical History', icon: 'FileText' },
              { id: 'medications', label: 'Medications', icon: 'Pill' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-surface-500 hover:text-surface-700 hover:border-surface-300'
                }`}
              >
                <ApperIcon name={tab.icon} size={16} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-surface-900 mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-surface-600">Date of Birth</p>
                      <p className="text-surface-900">{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-600">Phone</p>
                      <p className="text-surface-900">{patient.phone}</p>
                    </div>
                    {patient.email && (
                      <div>
                        <p className="text-sm font-medium text-surface-600">Email</p>
                        <p className="text-surface-900">{patient.email}</p>
                      </div>
                    )}
                    {patient.address && (
                      <div>
                        <p className="text-sm font-medium text-surface-600">Address</p>
                        <p className="text-surface-900">{patient.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-surface-900 mb-4">Emergency Contact</h3>
                  {patient.emergencyContact && patient.emergencyContact.name ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-surface-600">Name</p>
                        <p className="text-surface-900">{patient.emergencyContact.name}</p>
                      </div>
                      {patient.emergencyContact.phone && (
                        <div>
                          <p className="text-sm font-medium text-surface-600">Phone</p>
                          <p className="text-surface-900">{patient.emergencyContact.phone}</p>
                        </div>
                      )}
                      {patient.emergencyContact.relationship && (
                        <div>
                          <p className="text-sm font-medium text-surface-600">Relationship</p>
                          <p className="text-surface-900">{patient.emergencyContact.relationship}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-surface-500">No emergency contact information</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'appointments' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-surface-900">Appointment History</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
                >
                  <ApperIcon name="Plus" size={16} className="mr-2" />
                  New Appointment
                </motion.button>
              </div>

              {appointments.length > 0 ? (
                <div className="space-y-3">
                  {appointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-surface-50 rounded-lg border border-surface-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <p className="font-medium text-surface-900">
                                {new Date(appointment.dateTime).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-surface-600">
                                {new Date(appointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-surface-900">{appointment.reason}</p>
                              <p className="text-sm text-surface-600">{appointment.duration} minutes</p>
                            </div>
                          </div>
                          {appointment.notes && (
                            <p className="text-sm text-surface-600 mt-2">{appointment.notes}</p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ApperIcon name="Calendar" className="w-12 h-12 text-surface-400 mx-auto mb-4" />
                  <p className="text-surface-600">No appointments scheduled</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'medical' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-surface-900">Medical History</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
                >
                  <ApperIcon name="Plus" size={16} className="mr-2" />
                  Add Record
                </motion.button>
              </div>

              {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                <div className="space-y-4">
                  {patient.medicalHistory.map((record, index) => (
                    <div key={index} className="p-4 bg-surface-50 rounded-lg border border-surface-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-surface-900">{record.condition}</p>
                          <p className="text-sm text-surface-600">{record.date}</p>
                          {record.notes && (
                            <p className="text-sm text-surface-600 mt-2">{record.notes}</p>
                          )}
                        </div>
                        <span className="text-xs text-surface-500">{record.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ApperIcon name="FileText" className="w-12 h-12 text-surface-400 mx-auto mb-4" />
                  <p className="text-surface-600">No medical history recorded</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'medications' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-surface-900">Current Medications</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
                >
                  <ApperIcon name="Plus" size={16} className="mr-2" />
                  Add Medication
                </motion.button>
              </div>

              {patient.currentMedications && patient.currentMedications.length > 0 ? (
                <div className="space-y-4">
                  {patient.currentMedications.map((medication, index) => (
                    <div key={index} className="p-4 bg-surface-50 rounded-lg border border-surface-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-surface-900">{medication.name}</p>
                          <p className="text-sm text-surface-600">{medication.dosage}</p>
                          <p className="text-sm text-surface-600">{medication.frequency}</p>
                        </div>
                        <span className="text-xs text-surface-500">Started: {medication.startDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ApperIcon name="Pill" className="w-12 h-12 text-surface-400 mx-auto mb-4" />
                  <p className="text-surface-600">No current medications</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;