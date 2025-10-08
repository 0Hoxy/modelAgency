import type { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@stores/authStore'

type Props = { children: ReactElement }

export default function RequireAuth({ children }: Props) {
  const isAuthed = useAuthStore.getState().isAuthenticated
  return isAuthed ? children : <Navigate to="/admin/login" replace />
}
