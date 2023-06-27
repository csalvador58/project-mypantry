import { NextFunction, Request, Response, Router } from 'express';
import todoRoutes from './todos';
const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`
  ${req.method} ${req.url}
  Headers: ${req.headers.authorization}
  Body: ${JSON.stringify(req.body)}
  at ${new Date()}`);
  next();
});

router.use('/todos', todoRoutes);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default router;
