import mongoose, { Document, Model } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  role: string;
}
export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}

export type LoginUser = Omit<IUser, 'role'>;

const userSchema = new mongoose.Schema<IUserDocument, IUserModel>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
export default User;
