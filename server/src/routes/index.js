import { Router } from "express";
import userRouter from "./usuario.js";

const router = Router()

router.use('/users', userRouter)

export default router;