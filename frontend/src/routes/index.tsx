import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { authRoutes } from './auth';
import { myPantryRoutes } from './myPantry';
import { salesRoutes } from './sales';
import { useAuth } from 'src/hooks/use-auth';
// import HomePage from 'src/pages';
const HomePage = lazy(() => import('src/pages/index'));

const Error401Page = lazy(() => import('src/pages/401'));
const Error404Page = lazy(() => import('src/pages/404'));
const Error500Page = lazy(() => import('src/pages/500'));

const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/jwt/login" />
  }

  return <Outlet />;
};

export const routes: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense>
          <ProtectedRoutes />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      ...myPantryRoutes,
      ...salesRoutes,
    ],
  },
  ...authRoutes,
  {
    path: '401',
    element: <Error401Page />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '500',
    element: <Error500Page />,
  },
  {
    path: '*',
    element: <Error404Page />,
  },
];
