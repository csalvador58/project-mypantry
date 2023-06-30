import Token, { IPayload, IToken, ITokenDocument } from '../models/token.model';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import 'dotenv/config';

const ONE_DAY = 24 * 60 * 60; // 24hrs in seconds

export const generateToken = async (
  userId: mongoose.Schema.Types.ObjectId,
  secret: string = process.env['JWT_SECRET']!
): Promise<string | null> => {
  const currentDateInSeconds = Date.now() / 1000;
  const expDateInSeconds = currentDateInSeconds + ONE_DAY;
  const payload: IPayload = {
    sub: userId.toString(),
    iat: currentDateInSeconds,
    exp: expDateInSeconds,
  };

  const newToken = jwt.sign(payload, secret, { algorithm: 'HS256' });

  const storeToken: IToken = {
    token: newToken,
    userId: userId,
    expires: new Date(expDateInSeconds * 1000), // convert time to milliseconds
    blacklisted: false,
  };

  const result = await saveToken(userId, storeToken);
  console.log('result of token store');
  console.log(result);

  // Return null if token was not saved successfully
  if (!result) {
    return null;
  }
  return newToken;
};

export const saveToken = async (
  userId: mongoose.Schema.Types.ObjectId,
  token: IToken
): Promise<ITokenDocument | null> => {
  return await Token.findByIdAndUpdate(userId, token, {
    upsert: true,
    new: true,
  });
};
