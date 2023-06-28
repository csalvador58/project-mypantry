import app from './app';
import mongoose from 'mongoose';

const port = process.env.PORT || 3000;
const mongoURL =
  process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1/mypantry';

mongoose
  .connect(mongoURL, {})
  .then(() => {
    app.listen(port, () => {
      console.log(`App server is listening on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.error(`Failed to start server`, e);
  });
