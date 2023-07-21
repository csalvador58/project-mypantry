import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';

// Pantry
const SalesListPage = lazy(() => import('src/pages/sales/sales-list'));

export const salesRoutes: RouteObject[] = [
  {
    path: 'sales',
    element: (
      // <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      // </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <SalesListPage />,
      },
    ],
  },
];
