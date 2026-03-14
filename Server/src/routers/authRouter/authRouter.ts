import { Router } from 'express'
import { googleLogin } from '../../controllers/authController';

const authRouter = Router();

authRouter.get("/google", googleLogin);

export default authRouter;