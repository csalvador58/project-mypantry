import { Request, Response, NextFunction, Router } from 'express';

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`
  ${req.method} ${req.url}
  Headers: ${req.headers.authorization}
  Body: ${JSON.stringify(req.body)}
  at ${new Date()}`);
  next();
});

export default router;
