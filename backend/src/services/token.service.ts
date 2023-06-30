import Token, { IToken, ITokenDocument } from '../models/token.model';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import 'dotenv/config';

const ONE_DAY = 24 * 60 * 60 * 1000; // 24hrs in milliseconds

export const generateToken = (
  userId: mongoose.Types.ObjectId,
  secret: string = process.env['JWT_SECRET']!
): string => {
  const currentDate = Date.now();
  const payload = {
    sub: userId,
    iat: currentDate,
    exp: currentDate + ONE_DAY,
  };
  return jwt.sign(payload, secret, { algorithm: 'HS256' });
};
