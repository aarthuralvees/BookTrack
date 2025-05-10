import { Router } from "express";
import UserController from '../controllers/index.js';

const userRouter = Router();

userRouter.post('/create', UserController.createUser)                //criar user
userRouter.get('/userId/:id', UserController.findUserById);          //info de um usuário
userRouter.get('/userEmail/:email', UserController.findUserByEmail); //info de um usuário
userRouter.get('/allUsers', UserController.listUsers);               //info de vários
userRouter.put('/update/:id', UserController.updateUser);            //atualizar
userRouter.delete('/delete/:id', UserController.deleteUser);         //deletar

export default userRouter;