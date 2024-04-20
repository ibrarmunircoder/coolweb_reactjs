import {
  AppLayout,
  AuthRedirect,
  RequireAuth,
  Spinner,
} from '@/shared/components';
import { useLoadUserSession } from '@/shared/hooks/useLoadUserSession';
import { lazy } from 'react';
import {
  BrowserRouter,
  Routes as Router,
  Route,
  Navigate,
} from 'react-router-dom';
import { withLoading } from 'shared/hocs/WithLoading';

const LoginPage = lazy(() => import('pages/login'));
const AddFormValuesPage = lazy(() => import('pages/add-values'));

const Login = withLoading(LoginPage);
const AddFormValues = withLoading(AddFormValuesPage);

export const Routes = () => {
  const { isAuthenticating } = useLoadUserSession();

  if (isAuthenticating) {
    return <Spinner />;
  }
  return (
    <BrowserRouter>
      <Router>
        <Route element={<AuthRedirect />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path="/add-values" element={<AddFormValues />} />
          </Route>
        </Route>
      </Router>
    </BrowserRouter>
  );
};
