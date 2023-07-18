import { Request, Response, NextFunction } from 'express';
import InvalidInputError from './InvalidInputError';
import mongoose from 'mongoose';
import InvalidTokenError from './InvalidTokenError';
import { JsonWebTokenError } from 'jsonwebtoken';
import InvalidAPIRequestError from './InvalidAPIRequest';

interface MongoError extends Error {
  code: number;
}

export const errorHandler = (
  err: MongoError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Backend- Error Handler');
  console.log('err.message');
  console.log(err.message);
  console.log('err.code');
  console.log(err.code);

  // Errors - 400s

  // 400 BAD Request Errors
  if (
    err instanceof mongoose.Error &&
    err.message.includes('validation failed')
  ) {
    return res.status(400).json({ error: 'mongoose.Error - ' + err.message });
  }

  if (
    err instanceof mongoose.Error &&
    err.message.includes('Cast to ObjectId')
  ) {
    return res.status(400).json({ error: 'mongoose.Error - ' + 'Invalid ID' });
  }

  if (err instanceof InvalidInputError) {
    return res
      .status(400)
      .json({ error: 'InvalidInputError - ' + err.message });
  }

  if (err instanceof InvalidAPIRequestError) {
    return res
      .status(400)
      .json({ error: 'InvalidAPIRequestError - ' + err.message });
  }

  if (
    err.name === 'BSONError' &&
    err.message.includes('12 bytes or a string of 24 hex characters')
  ) {
    return res
      .status(400)
      .json({ error: 'InvalidInputError - ' + err.message });
  }
  // 401 Unauthorized Errors
  if (
    err instanceof JsonWebTokenError &&
    err.message.includes('jwt malformed')
  ) {
    return res
      .status(401)
      .json({ error: 'JsonWebTokenError - ' + 'Invalid password' });
  }
  if (err instanceof JsonWebTokenError) {
    return res
      .status(401)
      .json({ error: 'JsonWebTokenError - ' + err.message });
  }

  if (err instanceof InvalidTokenError) {
    return res
      .status(401)
      .json({ error: 'InvalidTokenError - ' + err.message });
  }

  // 409 Conflict Errors
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(409).json({ error: 'MongoServerError ' + err.message });
  }

  // Errors - 500s

  // 503 Service Unavailable

  if (err.message.includes('Invalid salt')) {
    // handle bcrypt encryption error
    return res.status(503).json({
      message: 'Service currently unavailable, please try again later.',
    });
  }

  console.log('err instanceof mongoose.Error');
  console.log(err instanceof mongoose.Error);

  console.log('err instanceof JsonWebTokenError');
  console.log(err instanceof JsonWebTokenError);

  console.log('err.name');
  console.log(err.name);
  console.log('err.stack');
  console.log(err.stack);
  return res.status(500).json({ error: err.message });
};
