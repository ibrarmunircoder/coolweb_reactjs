import {
  useAuthIsAuthenticatedSelector,
  useAuthUserSelector,
} from '@/shared/hooks/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthRedirect = () => {
  const isAuthenticated = useAuthIsAuthenticatedSelector();
  const user = useAuthUserSelector();
  const isLoggedIn = isAuthenticated && user;
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};
