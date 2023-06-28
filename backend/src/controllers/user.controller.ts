import { RequestHandler } from 'express';
import { IUser } from '../models/user.model';
import * as userService from '../services/user.service';
import catchAsync from '../utils/catchAsync';

export const createUser: RequestHandler = catchAsync(async (req, res) => {
  let createUser = req.body as IUser;

  const result = await userService.createUser({
    username: createUser.username,
    password: createUser.password,
    role: createUser.role,
  });

  res.status(201).json({ message: 'User created successfully', user: result });
});

export const getUsers: RequestHandler = catchAsync(async (req, res) => {
  const users = await userService.getUsers();

  res.status(201).json(users);
});
