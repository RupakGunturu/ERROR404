import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute=({ children })=> {
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  return children;
}
