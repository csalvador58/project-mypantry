import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

interface MongoError extends Error {
    code: number;
}

export const errorHandler = (
  err: MongoError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof mongoose.Error &&
    err.message.includes('validation failed')
  ) {
    return res.status(400).json({ error: err.message });
  }

  if(err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(409).json({error: err.message})
  }

  
  console.log('err.message')
  console.log(err.message)
  console.log('err.code')
  console.log(err.code)

  console.log('err instanceof mongoose.Error');
  console.log(err instanceof mongoose.Error);

  console.log('err.name')
  console.log(err.name)
  console.log('err.stack')
  console.log(err.stack)
  return res.status(500).json({ error: err.message });
};
