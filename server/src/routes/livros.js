import { Router } from "express";
import { BookController } from "../controllers/index.js";

const bookRouter = Router();

bookRouter.get('/getAll', BookController.getAll);               //todos os livros-
bookRouter.get('/singleBook/:bookId', BookController.findBook); //Livro especifico-
bookRouter.get('/userBooks', BookController.getUserBooks);      //Livros de um usuario-
bookRouter.post('/add', BookController.addBook);                //Adicionar livro-
bookRouter.put('/update/:bookId', BookController.updateBook);   //Atualizar livro
bookRouter.delete('/delete/:bookId', BookController.delete);    //Deletar livro-

export default bookRouter;