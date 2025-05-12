import { Router } from "express";
import userRouter from "./usuario.js";
import authRouter from "./auth.js";
import bookRouter from "./livros.js";
import verifyToken from "../middleware/auth.js"

const router = Router()

router.use('/', authRouter)
router.use('/users', verifyToken, userRouter)
router.use('/books', verifyToken, bookRouter)

export default router;