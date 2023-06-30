import mongoose, { Document, Model } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export interface IToken {
  token: string;
  userId: mongoose.Schema.Types.ObjectId;
  expires: Date;
  blacklisted: boolean;
}

export interface ITokenDocument extends IToken, Document {}
export interface ITokenModel extends Model<ITokenDocument> {}

export type NewToken = Omit<IToken, 'blacklisted'>;

export interface IPayload extends JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

export interface TokenPayload {
  token: string;
  expires: number;
}

export interface ITokenLogin {
  username: string;
  password: string;
}

const tokenSchema = new mongoose.Schema<ITokenDocument, ITokenModel>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model<ITokenDocument, ITokenModel>('Token', tokenSchema);

export default Token;
