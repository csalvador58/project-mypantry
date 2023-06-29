import mongoose from 'mongoose';
import 'dotenv/config';

const mongoURL = process.env['MONGODB_URL_TEST'] || 'mongodb://127.0.0.1/mypantry_test';

export const connectDB = async () => {
  await mongoose.connect(mongoURL, {});
};

export const stopDB = async () => {
  await mongoose.disconnect();
};

export const clearDB = async () => {
  await Promise.all(
    Object.values(mongoose.connection.collections).map(async (collection) =>
      collection.deleteMany({})
    )
  );
};
