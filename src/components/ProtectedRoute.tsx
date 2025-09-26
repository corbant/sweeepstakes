import { useUserStore } from '../stores/user'
import { Navigate } from 'react-router-dom'
import type { JSX } from 'react'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)()
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
