import { createBrowserRouter } from 'react-router-dom'

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
import ModelsList from './models/List'
import ModelsOverseas from './models/Overseas'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  { path: '/models/list', element: <ModelsList /> },
  { path: '/models/categories', element: <ModelsCategories /> },
  { path: '/models/filters', element: <ModelsFilters /> },
  { path: '/models/domestic', element: <ModelsDomestic /> },
  { path: '/models/overseas', element: <ModelsOverseas /> },
  { path: '/models/camera-test', element: <ModelsCameraTest /> },
  {
    path: '/hr',
    element: <Hr />,
  },
  { path: '/hr/members', element: <HrMembers /> },
  { path: '/hr/recruit', element: <HrRecruit /> },
  { path: '/hr/attendance', element: <HrAttendance /> },
  { path: '/hr/payroll', element: <HrPayroll /> },
  { path: '/hr/training', element: <HrTraining /> },
  { path: '/hr/benefits', element: <HrBenefits /> },
  { path: '/hr/performance', element: <HrPerformance /> },
  { path: '/finance/expenses', element: <FinanceExpenses /> },
  { path: '/finance/income', element: <FinanceIncome /> },
  { path: '/finance/reports', element: <FinanceReports /> },
  {
    path: '/contact',
    element: <Contact />,
  },
  { path: '/contact/new', element: <ContactNew /> },
  { path: '/dashboard/overview', element: <DashboardOverview /> },
  { path: '/dashboard/stats', element: <DashboardStats /> },
])
