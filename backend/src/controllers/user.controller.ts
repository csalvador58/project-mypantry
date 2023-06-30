import { RequestHandler } from 'express';
import { IUser } from '../models/user.model';
import * as userService from '../services/user.service';
import catchAsync from '../utils/catchAsync';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const SALT_ROUNDS = parseInt(process.env['BCRYPT_SALT_ROUNDS']!) || 10;

export const registerUser: RequestHandler = catchAsync(async (req, res) => {
  console.log('user.controller - registerUser')
  const { username, password, role } = req.body as IUser;


  console.log('username, password, role')
  console.log(username, password, role)

  console.log('SALT_ROUNDS')
  console.log(SALT_ROUNDS)

  
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  console.log('hashedPassword')
  console.log(hashedPassword)

  const result = await userService.registerUser({
    username: username,
    password: hashedPassword,
    role: role,
  });

  console.log('result')
  console.log(result)

  res
    .status(201)
    .json({ message: 'User successfully registered', user: result });
});

export const getUsers: RequestHandler = catchAsync(async (req, res) => {
  const users = await userService.getUsers();

  res.status(201).json(users);
});
