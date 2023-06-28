import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  role: string;
}
export interface IUserDocument extends Document {}

export type LoginUser = Omit<IUser, 'role'>;

const userSchema: Schema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export default mongoose.model<IUser>('User', userSchema);
