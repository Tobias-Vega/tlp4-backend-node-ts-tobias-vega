import express from 'express';
import router from './routes/auth.routes.js';

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use('/register', router);

  return app;
}