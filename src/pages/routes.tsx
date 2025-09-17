import { createBrowserRouter } from 'react-router-dom'

import Contact from './Contact'
import ContactNew from './contact/New'
import Dashboard from './Dashboard'
import DashboardOverview from './dashboard/Overview'
import DashboardStats from './dashboard/Stats'
import Finance from './Finance'
import FinanceExpenses from './finance/Expenses'
import FinanceIncome from './finance/Income'
import FinanceReports from './finance/Reports'
import Home from './Home'
import Hr from './Hr'
import HrMembers from './hr/Members'
import HrRecruit from './hr/Recruit'
import HrReview from './hr/Review'
import Models from './Models'
import ModelsCategories from './models/Categories'
import ModelsFilters from './models/Filters'
import ModelsList from './models/List'
import ModelsCameraTest from './models/CameraTest'
import ModelsDomestic from './models/Domestic'
import ModelsOverseas from './models/Overseas'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/models',
    element: <Models />,
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
  { path: '/hr/review', element: <HrReview /> },
  {
    path: '/finance',
    element: <Finance />,
  },
  { path: '/finance/expenses', element: <FinanceExpenses /> },
  { path: '/finance/income', element: <FinanceIncome /> },
  { path: '/finance/reports', element: <FinanceReports /> },
  {
    path: '/contact',
    element: <Contact />,
  },
  { path: '/contact/new', element: <ContactNew /> },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  { path: '/dashboard/overview', element: <DashboardOverview /> },
  { path: '/dashboard/stats', element: <DashboardStats /> },
])
