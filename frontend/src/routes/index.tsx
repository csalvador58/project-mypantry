import { Suspense } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import HomePage from 'src/pages';
import PantryPage from 'src/pages/pantry';

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
        element: <HomePage />
      },
      {
        path: '/pantry',
        element: <PantryPage />
      }
    ]
  }
];
