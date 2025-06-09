import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Patients from '../pages/Patients';
import PatientProfile from '../pages/PatientProfile';
import Appointments from '../pages/Appointments';
import Staff from '../pages/Staff';
import Departments from '../pages/Departments';
import Reports from '../pages/Reports';
import NotFound from '../pages/NotFound';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home
  },
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    component: Dashboard
  },
  patients: {
    id: 'patients',
    label: 'Patients',
    path: '/patients',
    icon: 'Users',
    component: Patients
  },
  patientProfile: {
    id: 'patientProfile',
    label: 'Patient Profile',
    path: '/patients/:id',
    icon: 'User',
    component: PatientProfile,
    hideFromNav: true
  },
  appointments: {
    id: 'appointments',
    label: 'Appointments',
    path: '/appointments',
    icon: 'Calendar',
    component: Appointments
  },
  staff: {
    id: 'staff',
    label: 'Staff',
    path: '/staff',
    icon: 'UserCheck',
    component: Staff
  },
  departments: {
    id: 'departments',
    label: 'Departments',
    path: '/departments',
    icon: 'Building2',
    component: Departments
  },
  reports: {
    id: 'reports',
    label: 'Reports',
    path: '/reports',
    icon: 'FileText',
    component: Reports
  },
  notFound: {
    id: 'notFound',
    label: '404',
    path: '*',
    component: NotFound,
    hideFromNav: true
  }
};

export const routeArray = Object.values(routes);