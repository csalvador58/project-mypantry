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

export const isPasswordValid: RequestHandler = catchAsync((req, res, next) => {
  const { password } = req.body;
  if (!password || password.trim() === '' || password.length < 6) {
    throw new InvalidInputError('Invalid password');
  }
  next();
});
