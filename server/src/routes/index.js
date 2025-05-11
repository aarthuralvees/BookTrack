import { Router } from "express";
import userRouter from "./usuario.js";
import authRouter from "./auth.js";

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)

export default router;