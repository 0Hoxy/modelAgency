import { createBrowserRouter } from 'react-router-dom'

import Contact from './Contact'
import Dashboard from './Dashboard'
import Home from './Home'
import Models from './Models'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/models',
    element: <Models />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
])
