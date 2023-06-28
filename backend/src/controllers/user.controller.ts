import { RequestHandler } from 'express';
import { IUser } from '../models/user.model';
import * as userService from '../services/user.service';
import catchAsync from '../utils/catchAsync';

export const registerUser: RequestHandler = catchAsync(async (req, res) => {
  const registerUser = req.body as IUser;

  const result = await userService.registerUser({
    username: registerUser.username,
    password: registerUser.password,
    role: registerUser.role,
  });

  res.status(201).json({ message: 'User successfully registered', user: result });
});

export const getUsers: RequestHandler = catchAsync(async (req, res) => {
  const users = await userService.getUsers();

  res.status(201).json(users);
});
