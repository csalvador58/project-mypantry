import { Request, Response, NextFunction } from 'express';
import InvalidInputError from './InvalidInputError.js';
import mongoose from 'mongoose';
import InvalidTokenError from './InvalidTokenError.js';
import jwt from 'jsonwebtoken';
import InvalidAPIRequestError from './InvalidAPIRequest.js';
import ErrorLog, { IErrorLog } from '../models/errorLog.model.js';

interface MongoError extends Error {
  code: number;
}

export const errorHandler = async (
  err: MongoError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { JsonWebTokenError } = jwt;
  console.log('Backend- Error Handler');
  console.log('err.message');
  console.log(err.message);
  console.log('err.code');
  console.log(err.code);

  let errorLogged = false;

  const errorLog = {
    errType: err.name,
    errMessage: err.message,
    errStackTrace: err.stack,
    errCode: err.code,
  } as IErrorLog;

  const errorLogResponse = await ErrorLog.create(errorLog);

  errorLogged = errorLogResponse ? true : false;

  // Errors - 400s

  // 400 BAD Request Errors
  if (
    err instanceof mongoose.Error &&
    err.message.includes('validation failed')
  ) {
    return res.status(400).json({
      error: 'mongoose.Error - ' + err.message,
      isLogged: errorLogged,
    });
  }

  if (
    err instanceof mongoose.Error &&
    err.message.includes('Cast to ObjectId')
  ) {
    return res.status(400).json({
      error: 'mongoose.Error - ' + 'Invalid ID',
      isLogged: errorLogged,
    });
  }

  if (err instanceof InvalidInputError) {
    return res.status(400).json({
      error: 'InvalidInputError - ' + err.message,
      isLogged: errorLogged,
    });
  }

  if (err instanceof InvalidAPIRequestError) {
    return res.status(400).json({
      error: 'InvalidAPIRequestError - ' + err.message,
      isLogged: errorLogged,
    });
  }

  if (
    err.name === 'BSONError' &&
    err.message.includes('12 bytes or a string of 24 hex characters')
  ) {
    return res.status(400).json({
      error: 'InvalidInputError - ' + err.message,
      isLogged: errorLogged,
    });
  }
  // 401 Unauthorized Errors
  if (
    err instanceof JsonWebTokenError &&
    err.message.includes('jwt malformed')
  ) {
    return res.status(401).json({
      error: 'JsonWebTokenError - ' + 'Invalid password',
      isLogged: errorLogged,
    });
  }
  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      error: 'JsonWebTokenError - ' + err.message,
      isLogged: errorLogged,
    });
  }

  if (err instanceof InvalidTokenError) {
    return res.status(401).json({
      error: 'InvalidTokenError - ' + err.message,
      isLogged: errorLogged,
    });
  }

  // 409 Conflict Errors
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(409).json({
      error: 'MongoServerError ' + err.message,
      isLogged: errorLogged,
    });
  }

  // Errors - 500s

  // 503 Service Unavailable

  if (err.message.includes('Invalid salt')) {
    // handle bcrypt encryption error
    return res.status(503).json({
      message: 'Service currently unavailable, please try again later.',
      isLogged: errorLogged,
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
  return res.status(500).json({ error: err.message, isLogged: errorLogged });
};
