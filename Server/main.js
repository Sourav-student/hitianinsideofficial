import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import path from 'path';
import postRouter from './routers/postRouter.js';
import getRouter from './routers/getRouter.js';
import authRouter from './routers/authRouter.js';
import { dbConn } from './utils/dbConnection.js';

const PORT = process.env.PORT
const app = express();

dbConn();

//middlwares
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_SITE_URL,
  credentials: true,
}));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.json());
app.use(postRouter);
app.use(getRouter);
app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})