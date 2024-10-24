import React from 'react';
import { Navigate } from 'react-router-dom';

interface LoginRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const LoginRoute: React.FC<LoginRouteProps> = ({ children, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/panel" /> : <>{children}</>;
};

export default LoginRoute;
