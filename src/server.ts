import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routers from './app/routes/routes';
import bot from './botTele';

const port = parseInt(process.env.PORT || '3000');

AppDataSource.initialize().then(async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(routers);

  return app.listen(port, () => console.log(`PORTA: ${port}`));
});
