import { RequestHandler } from 'express';
import InvalidInputError from '../errors/InvalidInputError.js';
import {catchAsync} from '../utils/index.js';


export const isPasswordValid: RequestHandler = catchAsync((req, res, next) => {
  const { password } = req.body;
  if (!password || password.trim() === '' || password.length < 6) {
    throw new InvalidInputError('Invalid password');
  }
  next();
});
