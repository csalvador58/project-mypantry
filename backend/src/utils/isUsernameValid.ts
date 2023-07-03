import { RequestHandler } from 'express';
import InvalidInputError from '../errors/InvalidInputError';
import catchAsync from '../utils/catchAsync';

export const isUsernameValid: RequestHandler = catchAsync((req, res, next) => {
    const { username } = req.body;
    if (!username || username.trim() === '' || username.length < 3) {
      throw new InvalidInputError('Invalid username');
    }
    next();
  });