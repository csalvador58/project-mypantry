import { RequestHandler } from 'express';
import InvalidInputError from '../errors/InvalidInputError.js';
import {catchAsync} from '../utils/index.js';
import InvalidAPIRequestError from '../errors/InvalidAPIRequest.js';

export const isUsernameValid: RequestHandler = catchAsync((req, res, next) => {
  console.log('isUsernameValid - req.body')
  console.log(req.body)
  if (!Object.keys(req.body).length) {
    throw new InvalidAPIRequestError('Request Body not found');
  }
  const { username } = req.body;
  if (!username || username.trim() === '' || username.length < 3) {
    throw new InvalidInputError('Invalid username');
  }
  next();
});
