import { RequestHandler } from 'express';
import { IUser } from '../models/user.model';
import * as userService from '../services/user.service';
import catchAsync from '../utils/catchAsync';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const SALT_ROUNDS = parseInt(process.env['BCRYPT_SALT_ROUNDS']!) || 15;

export const registerUser: RequestHandler = catchAsync(async (req, res) => {
  const { username, password, role } = req.body as IUser;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await userService.registerUser({
    username: username,
    password: hashedPassword,
    role: role,
  });

  res
    .status(201)
    .json({ message: 'User successfully registered', user: result });
});

export const getUsers: RequestHandler = catchAsync(async (req, res) => {
  const users = await userService.getUsers();

  res.status(201).json(users);
});
