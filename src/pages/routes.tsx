import { createBrowserRouter } from 'react-router-dom'
import RequireAuth from './RequireAuth'

import AdminLogin from './admin/Login'
import Contact from './Contact'
import ContactNew from './contact/New'
import DashboardOverview from './dashboard/Overview'
import DashboardStats from './dashboard/Stats'
import FinanceExpenses from './finance/Expenses'
import FinanceIncome from './finance/Income'
import FinanceReports from './finance/Reports'
import Home from './Home'
import Hr from './Hr'
import HrAttendance from './hr/Attendance'
import HrBenefits from './hr/Benefits'
import HrMembers from './hr/Members'
import HrPayroll from './hr/Payroll'
import HrPerformance from './hr/Performance'
import HrRecruit from './hr/Recruit'
import HrTraining from './hr/Training'
import ModelsCameraTest from './models/CameraTest'
import ModelsCategories from './models/Categories'
import ModelsDomestic from './models/Domestic'
import ModelsFilters from './models/Filters'
import ModelsOverseas from './models/Overseas'
import ModelsQRCode from './models/QRCode'
import ProfileSettings from './profile/Settings'
import RegistrationComplete from './registration/Complete'
import RegistrationLanding from './registration/Landing'
import RegistrationTypeSelection from './registration/ModelTypeSelection'
import RegistrationForm from './registration/RegistrationForm'
import RegistrationVerification from './registration/Verification'
import SettingsGeneral from './settings/General'
import SettingsPermissions from './settings/Permissions'
import SettingsUsers from './settings/Users'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RegistrationLanding />,
  },
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/registration', element: <RegistrationTypeSelection /> },
  { path: '/registration/verification', element: <RegistrationVerification /> },
  { path: '/registration/form', element: <RegistrationForm /> },
  { path: '/registration/complete', element: <RegistrationComplete /> },
  {
    path: '/home',
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: '/models/categories',
    element: (
      <RequireAuth>
        <ModelsCategories />
      </RequireAuth>
    ),
  },
  {
    path: '/models/filters',
    element: (
      <RequireAuth>
        <ModelsFilters />
      </RequireAuth>
    ),
  },
  {
    path: '/models/domestic',
    element: (
      <RequireAuth>
        <ModelsDomestic />
      </RequireAuth>
    ),
  },
  {
    path: '/models/overseas',
    element: (
      <RequireAuth>
        <ModelsOverseas />
      </RequireAuth>
    ),
  },
  {
    path: '/models/camera-test',
    element: (
      <RequireAuth>
        <ModelsCameraTest />
      </RequireAuth>
    ),
  },
  {
    path: '/models/qrcode',
    element: (
      <RequireAuth>
        <ModelsQRCode />
      </RequireAuth>
    ),
  },
  {
    path: '/hr',
    element: (
      <RequireAuth>
        <Hr />
      </RequireAuth>
    ),
  },
  {
    path: '/hr/members',
    element: (
      <RequireAuth>
        <HrMembers />
      </RequireAuth>
    ),
  },
  {
    path: '/hr/recruit',
    element: (
      <RequireAuth>
        <HrRecruit />
      </RequireAuth>
    ),
  },
  {
    path: '/hr/attendance',
    element: (
      <RequireAuth>
        <HrAttendance />
      </RequireAuth>
    ),
  },
  {
    path: '/hr/payroll',
    element: (
      <RequireAuth>
        <HrPayroll />
      </RequireAuth>
    ),
  },
  {
    path: '/hr/training',
    element: (
      <RequireAuth>
        <HrTraining />
      </RequireAuth>
    ),
  },
  {
    path: '/hr/benefits',
    element: (
      <RequireAuth>
        <HrBenefits />
      </RequireAuth>
    ),
  },
  {
    path: '/hr/performance',
    element: (
      <RequireAuth>
        <HrPerformance />
      </RequireAuth>
    ),
  },
  {
    path: '/finance/expenses',
    element: (
      <RequireAuth>
        <FinanceExpenses />
      </RequireAuth>
    ),
  },
  {
    path: '/finance/income',
    element: (
      <RequireAuth>
        <FinanceIncome />
      </RequireAuth>
    ),
  },
  {
    path: '/finance/reports',
    element: (
      <RequireAuth>
        <FinanceReports />
      </RequireAuth>
    ),
  },
  {
    path: '/contact',
    element: (
      <RequireAuth>
        <Contact />
      </RequireAuth>
    ),
  },
  {
    path: '/contact/new',
    element: (
      <RequireAuth>
        <ContactNew />
      </RequireAuth>
    ),
  },
  {
    path: '/dashboard/overview',
    element: (
      <RequireAuth>
        <DashboardOverview />
      </RequireAuth>
    ),
  },
  {
    path: '/dashboard/stats',
    element: (
      <RequireAuth>
        <DashboardStats />
      </RequireAuth>
    ),
  },
  {
    path: '/settings/users',
    element: (
      <RequireAuth>
        <SettingsUsers />
      </RequireAuth>
    ),
  },
  {
    path: '/settings/permissions',
    element: (
      <RequireAuth>
        <SettingsPermissions />
      </RequireAuth>
    ),
  },
  {
    path: '/settings/general',
    element: (
      <RequireAuth>
        <SettingsGeneral />
      </RequireAuth>
    ),
  },
  {
    path: '/profile/settings',
    element: (
      <RequireAuth>
        <ProfileSettings />
      </RequireAuth>
    ),
  },
])
