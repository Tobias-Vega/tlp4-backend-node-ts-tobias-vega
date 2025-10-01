import dotenv from 'dotenv';
import { createApp } from "./app.js";
import mongoose from 'mongoose';

dotenv.config();

const MONGO = process.env.MONGODB_URI!!;

async function start() {

  await mongoose.connect(MONGO);
  const app = createApp();
  const port = process.env.PORT;

  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
}

start();