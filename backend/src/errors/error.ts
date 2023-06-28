import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('err instanceof mongoose.Error')
  console.log(err instanceof mongoose.Error)
  console.log('Error encountered', err);
  res.status(500).json({ message: err.message });
};