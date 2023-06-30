import User, { IUser, IUserDocument } from '../models/user.model';

export const registerUser = async (userBody: IUser): Promise<IUserDocument> => {
  return User.create(userBody);
};

export const getUsers = async (): Promise<IUserDocument[]> => {
  return User.find().lean();
};

export const getUserByEmail = async (email: string): Promise<IUserDocument> => {
  return User.find({email: email}).lean()
}
