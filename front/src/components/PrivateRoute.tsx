
import React, {  useContext } from 'react';
import { MyContext } from '../contexts/AppContext';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useContext(MyContext);

  if (!user) {
    toast.error('Debes iniciar sesión para acceder a esta página');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;