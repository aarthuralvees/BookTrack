import { Router } from "express";
import { UserController } from '../controllers/index.js';
import verifyToken from "../middleware/auth.js"

const userRouter = Router();

userRouter.post('/create', UserController.createUser)                //criar user
userRouter.get('/userId/:id', verifyToken, UserController.findUserById);          //info de um usuário
userRouter.get('/userEmail/:email', verifyToken, UserController.findUserByEmail); //info de um usuário
userRouter.get('/allUsers', UserController.listUsers);               //info de vários
userRouter.put('/update/:id', verifyToken, UserController.updateUser);            //atualizar
userRouter.delete('/delete/:id', verifyToken, UserController.deleteUser);         //deletar

export default userRouter;