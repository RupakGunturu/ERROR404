import React from 'react';
import { Navigate } from 'react-router-dom';

export const SlotProtectedRoute=({ children })=> {
  const isAuthenticated = sessionStorage.getItem('PTath') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/Dept-login" />;
  }

  return children;
}
