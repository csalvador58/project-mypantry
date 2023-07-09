import { RequestHandler } from 'express';
import { IUser } from '../models/user.model';
import { ITokenLogin } from '../models/token.model';
import * as userService from '../services/user.service';
import * as tokenService from '../services/token.service';
import catchAsync from '../utils/catchAsync';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const SALT_ROUNDS = parseInt(process.env['BCRYPT_SALT_ROUNDS']!) || 10;

export const registerUser: RequestHandler = catchAsync(async (req, res) => {
  console.log('user.controller - registerUser')
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

export const loginUser: RequestHandler = catchAsync(async (req, res) => {
  console.log('token.controller - loginUser');
  const { username, password } = req.body as ITokenLogin;

  // retrieve user from db
  const userDB = (await userService.getUserByUsername(username))[0];
  if (!userDB) {
    return res.status(401).json({ error: 'Invalid User' });
  }
  const { username: usernameDB, _id: userId, password: hashedPassword } = userDB;

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
    .json({ message: 'Login successful', userId: userId, username: usernameDB, token: loginToken });
});
