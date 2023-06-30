import { RequestHandler } from 'express';
import { IUser } from '../models/user.model';
import * as userService from '../services/user.service';
import catchAsync from '../utils/catchAsync';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const registerUser: RequestHandler = catchAsync(async (req, res) => {
  const registerUser = req.body as IUser;
  const saltRounds = parseInt(process.env['BCRYPT_SALT_ROUNDS']!) || 15;
  const hashedPassword = await bcrypt.hash(registerUser.password, saltRounds);

  const result = await userService.registerUser({
    username: registerUser.username,
    password: hashedPassword,
    role: registerUser.role,
  });

  res
    .status(201)
    .json({ message: 'User successfully registered', user: result });
});

export const getUsers: RequestHandler = catchAsync(async (req, res) => {
  const users = await userService.getUsers();

  res.status(201).json(users);
});
