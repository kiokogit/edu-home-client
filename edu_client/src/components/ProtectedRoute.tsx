import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useFusionAuth } from '@fusionauth/react-sdk'

const ProtectedRoute = () => {
  const { isLoggedIn, isFetchingUserInfo } = useFusionAuth()
  const location = useLocation()

  // Show loading state while checking authentication
  if (isFetchingUserInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    // Redirect to login or home page
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
