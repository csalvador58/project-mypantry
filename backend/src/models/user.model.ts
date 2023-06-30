import mongoose, { Document, Model } from 'mongoose';

enum Roles {
  Admin = 'Admin',
  User = 'User',
}

export interface IUser {
  username: string;
  password: string;
  role: Roles;
}
export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}

export type LoginUser = Omit<IUser, 'role'>;

const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
};

export const roles: string[] = Object.keys(allRoles);

const userSchema = new mongoose.Schema<IUserDocument, IUserModel>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: Roles, required: true },
});

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
export default User;
