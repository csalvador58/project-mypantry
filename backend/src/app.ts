import express, { Express } from 'express';
import { json } from 'body-parser';
import routes from './routes/';
import { errorHandler } from './errors/errorHandler';

const app: Express = express();
app.use(json());

app.use(routes);

app.use(errorHandler);

export default app;
