import React from 'react';
import { Navigate } from 'react-router-dom';

export const slotProtectedRoute=({ children })=> {
  const isAuthenticated = sessionStorage.getItem('SlothAuth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
}
