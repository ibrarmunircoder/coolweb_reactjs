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
const AddStorePage = lazy(() => import('pages/add-store'));
const ProductsPage = lazy(() => import('pages/products'));

const Login = withLoading(LoginPage);
const AddStore = withLoading(AddStorePage);
const Products = withLoading(ProductsPage);

export const Routes = () => {
  const { isAuthenticating } = useLoadUserSession();

  if (isAuthenticating) {
    return <Spinner />;
  }
  return (
    <BrowserRouter>
      <Router>
        <Route element={<AuthRedirect />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path="/add-store" element={<AddStore />} />
            <Route path="/products" element={<Products />} />
          </Route>
        </Route>
      </Router>
    </BrowserRouter>
  );
};
