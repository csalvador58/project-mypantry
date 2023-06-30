import { RequestHandler } from 'express';
import { ITokenLogin } from '../models/token.model';
import * as userService from '../services/user.service';
import * as tokenService from '../services/token.service';
import bcrypt from 'bcrypt';

import catchAsync from '../utils/catchAsync';

export const loginUser: RequestHandler = catchAsync(async (req, res) => {
  console.log('token.controller - loginUser')
  const { username, password } = req.body as ITokenLogin;

  const userDB = (await userService.getUserByUsername(username))[0];
  if (!userDB) {
    return res.status(401).json({ error: 'Invalid User' });
  }
  console.log('userDB')
  console.log(userDB)
  const { _id: userId, password: hashedPassword } = userDB;

  console.log('password')
  console.log(password)
  console.log('hashedPassword')
  console.log(hashedPassword)
  // verify password matches DB
  const passwordIsValid = await bcrypt.compare(password, hashedPassword);

  if (passwordIsValid) {
    // Generate jwt token
    const loginToken = tokenService.generateToken(userId);
    return res
      .status(200)
      .json({ message: 'Login successful', token: loginToken });
  } else {
    return res.status(401).json({ error: 'Invalid username/password' });
  }
});
