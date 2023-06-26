import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from 'src/layouts/dashboard';
// import HomePage from 'src/pages';
const HomePage = lazy(() => import('src/pages'));

const Error401Page = lazy(() => import('src/pages/401'));
const Error404Page = lazy(() => import('src/pages/404'));
const Error500Page = lazy(() => import('src/pages/500'));

// Pantry
const PantryListPage = lazy(() => import('src/pages/customers/list'));
const PantryDetailPage = lazy(() => import('src/pages/customers/detail'));
const PantryEditPage = lazy(() => import('src/pages/customers/edit'));

export const routes: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'customers',
        children: [
          {
            index: true,
            element: <PantryListPage />,
          },
          {
            path: ':customerId',
            element: <PantryDetailPage />,
          },
          {
            path: ':customerId/edit',
            element: <PantryEditPage />,
          },
        ],
      },
    ],
  },
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
