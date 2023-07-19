import mongoose, { Document, Model } from 'mongoose';

export interface IErrorLog extends Error {
  errType?: string;
  errMessage?: string;
  errStackTrace?: string;
  errCode?: number;
}

export interface IErrorLogDocument extends Document {}
export interface IErrorLogModel extends Model<IErrorLogDocument> {}

const errorLogSchema = new mongoose.Schema(
  {
    errType: { type: String },
    errMessage: { type: String },
    errStackTrace: { type: String },
    errCode: { type: Number },
  },
  { timestamps: true }
);

const ErrorLog = mongoose.model<IErrorLogDocument, IErrorLogModel>(
  'ErrorLog',
  errorLogSchema
);

export default ErrorLog;
