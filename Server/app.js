import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import path from 'path';
import userGetRouter from './routers/userRouters/userGetRouters.js';
import authRouter from './routers/authRouter/authRouter.js';
import userPostRouter from './routers/userRouters/userPostRouters.js';
import adminPostRouter from './routers/adminRouters/adminPostRouters.js';
import adminPatchRouter from './routers/adminRouters/adminPatchRouters.js';
import adminDeleteRouter from './routers/adminRouters/adminDeleteRouters.js';
import adminGetRouter from './routers/adminRouters/adminGetRouter.js'
import { dbConn } from './utils/dbConnection.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT

dbConn();

//middlwares
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_SITE_URL,
  credentials: true,
}));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.json());
app.use(userGetRouter);
app.use(userPostRouter);
app.use(authRouter);
app.use(adminPostRouter);
app.use(adminPatchRouter);
app.use(adminDeleteRouter);
app.use(adminGetRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})