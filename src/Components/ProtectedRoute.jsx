import React from 'react'
import { Navigate } from 'react-router';
import Cookies from 'js-cookie'
function ProtectedRoute({children}) {
 const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute
