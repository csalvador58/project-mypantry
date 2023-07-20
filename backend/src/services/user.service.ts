import User, { IUser, IUserDocument, IUserRequest, Roles } from '../models/user.model.js';

export const registerUser = async (user: IUserRequest): Promise<IUserDocument> => {
  console.log('user.service - register user');
  const userBody: IUser = {
    ...user,
    role: Roles.User,
  };
  console.log('userBody');
  console.log(userBody);
  return await User.create(userBody);
};

export const getUsers = async (): Promise<IUserDocument[]> => {
  return await User.find().lean();
};

export const getUserByUsername = async (
  username: string
): Promise<IUserDocument[]> => {
  return await User.find({ username: username }).lean();
};
