import { Router } from 'express';
import userRouter from '../controllers/UserController';
import messageRouter from '../controllers/MessageController';
import loginRouter from '../controllers/LoginController';
import messageRecebidaRouter from '../controllers/MessageRecebidaController';

const routers = Router();

routers.use('/', userRouter);
routers.use('/', messageRouter);
routers.use('/', loginRouter);
routers.use('/', messageRecebidaRouter);
export default routers;
