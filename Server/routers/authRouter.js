import { Router } from 'express'
import { googleLogin } from '../controllers/authController.js';
const authRouter = Router();

authRouter.get("/auth/google", googleLogin)

export default authRouter;