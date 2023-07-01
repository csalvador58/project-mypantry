import Token, { IPayload, IToken, ITokenDocument } from '../models/token.model';
import jwt, {JsonWebTokenError} from 'jsonwebtoken';
import mongoose from 'mongoose';
import 'dotenv/config';
import InvalidTokenError from '../errors/InvalidTokenError';

const ONE_DAY = 24 * 60 * 60; // 24hrs in seconds
const TEST_ONE_MIN = 60; // 60 seconds

export const generateToken = async (
  userId: mongoose.Schema.Types.ObjectId,
  secret: string = process.env['JWT_SECRET']!
): Promise<string | null> => {
  const currentDateInSeconds = Date.now() / 1000;
  const expDateInSeconds = currentDateInSeconds + ONE_DAY;
  // const expDateInSeconds = currentDateInSeconds + TEST_ONE_MIN;  // TESTING ONLY
  const payload: IPayload = {
    sub: userId.toString(),
    iat: currentDateInSeconds,
    exp: expDateInSeconds,
  };

  const newToken = jwt.sign(payload, secret, { algorithm: 'HS256' });

  const token: IToken = {
    token: newToken,
    userId: userId,
    expires: new Date(expDateInSeconds * 1000), // convert time to milliseconds
    blacklisted: false,
  };

  // save token in DB
  const result = await saveToken(userId, token);

  // Return null if token was not saved successfully
  if (!result) {
    return null;
  }
  return newToken;
};

export const validateToken = (tokenString: string): IPayload | void => {
  try {
    const verifiedToken = jwt.verify(tokenString, process.env['JWT_SECRET']!) as IPayload;
    return verifiedToken;
  } catch (error: any) {
    if(error instanceof JsonWebTokenError) {
      throw new JsonWebTokenError(error.message)
    }
    else {
      throw new InvalidTokenError(error.message)
    }
  }
}

export const verifyBlacklist = async (jwtSub: string) => {
  console.log('token.service - verify blacklist')
  console.log('jwtSub')
  console.log(jwtSub)
  const userId = new mongoose.Types.ObjectId(jwtSub);
  return await Token.findOne({userId: userId}).lean();
}

export const saveToken = async (
  userId: mongoose.Schema.Types.ObjectId,
  token: IToken
): Promise<ITokenDocument | null> => {
  return await Token.findByIdAndUpdate(userId, token, {
    upsert: true,
    new: true,
  });
};
