// import { NextFunction, Request, Response, Router } from 'express';
// import todoRoutes from './todos';
// const router = Router();

// router.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(`
//   ${req.method} ${req.url}
//   Headers: ${req.headers.authorization}
//   Body: ${JSON.stringify(req.body)}
//   at ${new Date()}`);
//   next();
// });

// router.use('/todos', todoRoutes);

// router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).json({ message: err.message });
// });

// export default router;

import { Router } from 'express';
import authRoute from './auth.route';
import pantryRoute from './pantry.route';
import requestLogger from '../utils/reqLogger.route'

const router = Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  // requestLogger only for development
  {
    path: '/',
    route: requestLogger,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/pantry',
    route: pantryRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
