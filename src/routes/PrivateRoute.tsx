import { useAppSelector } from '../hooks';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = () => {
  const  token  = useAppSelector(state => state.auth.token);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
