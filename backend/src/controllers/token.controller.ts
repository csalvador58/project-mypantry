import { RequestHandler, Request } from 'express';
import catchAsync from '../utils/catchAsync.js';
import InvalidTokenError from '../errors/InvalidTokenError.js';
import * as TokenService from '../services/token.service.js';
import { IPayload } from '../models/token.model.js';

export interface AuthenticatedRequest extends Request {
    auth?: {
      token: string;
      payload: IPayload;
    };
}

export const isTokenValid: RequestHandler = catchAsync(
    async (req: AuthenticatedRequest, res, next) => {
      console.log('validate.services - isTokenValid');
  
      if (!req.headers) {
        throw new InvalidTokenError('Unauthorized - Login Required.');
      }
      const { authorization } = req.headers;
      const tokenString = authorization?.includes('Bearer')
        ? authorization.replace('Bearer ', '')
        : null;
  
      if (!tokenString || tokenString.trim() === '') {
        throw new InvalidTokenError('Unauthorized - Login Required.');
      }
  
      // validate token, error thrown if jwt expired;
      const validatedToken = TokenService.validateToken(tokenString) as IPayload;
      req.auth = {
        token: tokenString,
        payload: validatedToken,
      };
      next();
    }
  );
  
  export const isTokenBlacklisted: RequestHandler = catchAsync(
    async (req: AuthenticatedRequest, res, next) => {
      console.log('validate.services - isTokenBlacklisted');
      if(req.auth) {
        const userIdString = req.auth.payload.sub;
        const tokenDetails = await TokenService.verifyBlacklist(userIdString)
        if(tokenDetails?.blacklisted) {
          throw new InvalidTokenError('Unauthorized - Contact Administrator')
        }
      }
      next();
    }
  );