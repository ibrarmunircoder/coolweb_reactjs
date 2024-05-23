import {
  AppLayout,
  AuthRedirect,
  RequireAuth,
  Spinner,
} from '@/shared/components';
import { useLoadUserSession } from '@/shared/hooks/useLoadUserSession';
import { lazy } from 'react';
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { withLoading } from 'shared/hocs/WithLoading';

const LoginPage = lazy(() => import('pages/login'));
const AddStorePage = lazy(() => import('pages/add-store'));
const ProductsPage = lazy(() => import('pages/products'));
const AIBlogsPage = lazy(() => import('pages/ai-blogs'));
const BlogDetailPage = lazy(() => import('pages/blog-detail'));

const Login = withLoading(LoginPage);
const AddStore = withLoading(AddStorePage);
const Products = withLoading(ProductsPage);
const AIBlogs = withLoading(AIBlogsPage);
const BlogDetail = withLoading(BlogDetailPage);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<AuthRedirect />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/add-store" element={<AddStore />} />
          <Route path="/ai-blogs" element={<AIBlogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Route>
    </Route>
  )
);

export const Routes = () => {
  const { isAuthenticating } = useLoadUserSession();

  if (isAuthenticating) {
    return <Spinner />;
  }
  return <RouterProvider router={router} />;
};
