import { RequestHandler } from 'express';
import { ITokenLogin } from '../models/token.model';
import * as userService from '../services/user.service';
import * as tokenService from '../services/token.service';
import bcrypt from 'bcrypt';

import catchAsync from '../utils/catchAsync';

export const loginUser: RequestHandler = catchAsync(async (req, res) => {
  console.log('token.controller - loginUser');
  const { username, password } = req.body as ITokenLogin;

  const userDB = (await userService.getUserByUsername(username))[0];
  if (!userDB) {
    return res.status(401).json({ error: 'Invalid User' });
  }
  const { _id: userId, password: hashedPassword } = userDB;

  // verify password matches DB
  const passwordIsValid = await bcrypt.compare(password, hashedPassword);
  if (!passwordIsValid)
    return res.status(401).json({ error: 'Invalid username/password' });

  // Generate jwt token
  const loginToken = await tokenService.generateToken(userId);
  if (!loginToken)
    return res.status(503).json({
      message: 'Service currently unavailable, please try again later.',
    });

  return res
    .status(200)
    .json({ message: 'Login successful', token: loginToken });
});

export const validateToken: RequestHandler = catchAsync((req, res, next) => {
  console.log('token.controller - validateToken');

  if (!req.headers) {
    return res.status(401).json({ error: 'Unauthorized - Login Required.' });
  }
  const { authorization } = req.headers;
  const token = authorization?.includes('Bearer')
    ? authorization.replace('Bearer ', '')
    : null;

  if (token?.trim() === '') {
    return res.status(401).json({ error: 'Unauthorized - Login Required.' });
  }

  // Validate token here
  return res.status(200).json({ message: 'Good' });
});
