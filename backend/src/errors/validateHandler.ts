import { RequestHandler, Request } from 'express';
import InvalidInputError from './InvalidInputError';
import catchAsync from '../utils/catchAsync';
import InvalidTokenError from './InvalidTokenError';
import * as TokenService from '../services/token.service';
import { IPayload } from '../models/token.model';

interface AuthenticatedRequest extends Request {
  token?: IPayload;
}

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

export const isTokenValid: RequestHandler = catchAsync(
  async (req: AuthenticatedRequest, res, next) => {
    console.log('validate.services - isTokenValid');

    if (!req.headers) {
      throw new InvalidTokenError('Unauthorized - Login Required.');
    }
    const { authorization } = req.headers;
    const token = authorization?.includes('Bearer')
      ? authorization.replace('Bearer ', '')
      : null;

    if (!token || token.trim() === '') {
      throw new InvalidTokenError('Unauthorized - Login Required.');
    }

    // validate token, error thrown if jwt expired
    let validatedToken: IPayload | void;
    validatedToken = TokenService.validateToken(token);
    req.token = validatedToken as IPayload;
    next();
  }
);
