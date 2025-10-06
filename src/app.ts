import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookie from 'cookie-parser';
import authRouter from './modules/auth/routes/auth.routes.js';
import productRouter from './modules/products/routes/product.router.js';
import seedRouter from './seeds/seed.routes.js';

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(cookie());

  app.use('/api/auth', authRouter);
  app.use('/api/products', productRouter);
  app.use('/api/seed', seedRouter);

  return app;
}