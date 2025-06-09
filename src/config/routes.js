import HomePage from '@/components/pages/HomePage';
import DashboardPage from '@/components/pages/DashboardPage';
import PatientsPage from '@/components/pages/PatientsPage';
import PatientProfilePage from '@/components/pages/PatientProfilePage';
import AppointmentsPage from '@/components/pages/AppointmentsPage';
import StaffPage from '@/components/pages/StaffPage';
import DepartmentsPage from '@/components/pages/DepartmentsPage';
import ReportsPage from '@/components/pages/ReportsPage';
import NotFoundPage from '@/components/pages/NotFoundPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
component: HomePage
  },
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
component: DashboardPage
  },
  patients: {
    id: 'patients',
    label: 'Patients',
    path: '/patients',
    icon: 'Users',
component: PatientsPage
  },
  patientProfile: {
    id: 'patientProfile',
    label: 'Patient Profile',
    path: '/patients/:id',
    icon: 'User',
component: PatientProfilePage,
    hideFromNav: true
  },
  appointments: {
    id: 'appointments',
    label: 'Appointments',
    path: '/appointments',
    icon: 'Calendar',
component: AppointmentsPage
  },
  staff: {
    id: 'staff',
    label: 'Staff',
    path: '/staff',
    icon: 'UserCheck',
component: StaffPage
  },
  departments: {
    id: 'departments',
    label: 'Departments',
    path: '/departments',
    icon: 'Building2',
component: DepartmentsPage
  },
  reports: {
    id: 'reports',
    label: 'Reports',
    path: '/reports',
    icon: 'FileText',
component: ReportsPage
  },
  notFound: {
    id: 'notFound',
    label: '404',
    path: '*',
component: NotFoundPage,
    hideFromNav: true
  }
};

export const routeArray = Object.values(routes);