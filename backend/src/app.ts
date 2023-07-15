import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import routes from './routes/';
import { errorHandler } from './errors/errorHandler';

const app: Express = express();
app.use(json());

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(routes);

// For deploy test only
app.get('/', (req, res, next) => {
  res.send(`
    <html>
      <body>
        <h1> Server deployed! </h1>
      </body>
    </html>
  `);
});

app.use(errorHandler);

export default app;
