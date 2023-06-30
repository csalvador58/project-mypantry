import { RequestHandler } from 'express';
import { ITokenLogin } from '../models/token.model';
import * as userService from '../services/user.service';
import bcrypt from 'bcrypt';

import catchAsync from '../utils/catchAsync';

export const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { username, password } = req.body as ITokenLogin;

  const userDB = await userService.getUserByEmail(username);
  if (!userDB) {
    return res.status(401).json({ error: 'Invalid User' });
  }

  const { _id: userId, password: hashedPassword } = userDB;

  // verify password matches DB
  const passwordIsValid = await bcrypt.compare(password, hashedPassword);

  if(passwordIsValid) {
    // Generate jwt token
    const loginToken
  }
});
