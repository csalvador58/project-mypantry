import app from './app.js';
import mongoose from 'mongoose';
import 'dotenv/config';
const port = parseInt(process.env['PORT'] ?? '3000');
const mongoURL = process.env['MONGODB_URL'] ?? 'mongodb://127.0.0.1/mypantry';
mongoose
    .connect(mongoURL, {})
    .then(() => {
    app.listen(port, process.env['MONGODB_IP'] ?? '0.0.0.0', () => {
        console.log(`App server is listening on http://localhost:${port}`);
    });
})
    .catch((e) => {
    console.error(`Failed to start server`, e);
});
//# sourceMappingURL=index.js.map