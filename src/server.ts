import 'reflect-metadata';
import http from 'node:http';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routers from './app/routes/routes';
import bot from './botTele';
import { Server } from 'socket.io';

const port = parseInt(process.env.PORT || '3000');

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Altere para a URL do seu aplicativo Vue.js
  },
});

AppDataSource.initialize().then(async () => {
  app.use(cors());
  app.use(express.json());
  app.use(routers);

  return server.listen(port, () => console.log(`PORTA: ${port}`));
});
