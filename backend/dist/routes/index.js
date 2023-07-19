import { Router } from 'express';
import authRoute from './auth.route.js';
import pantryRoute from './pantry.route.js';
import requestLogger from '../utils/reqLogger.route.js';
import salesRoute from './sales.route.js';
const router = Router();
const defaultIRoute = [
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
    {
        path: '/sales',
        route: salesRoute,
    },
];
defaultIRoute.forEach((route) => {
    router.use(route.path, route.route);
});
export default router;
//# sourceMappingURL=index.js.map