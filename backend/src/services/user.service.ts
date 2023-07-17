import User, { IUser, IUserDocument, Roles } from '../models/user.model';

export const registerUser = async (userBody: IUser): Promise<IUserDocument> => {
  console.log('user.service - register user');
  userBody = {
    ...userBody,
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
