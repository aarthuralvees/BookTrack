import { Router } from "express";

const bookRouter = Router;

bookRouter.get('/getAll');                    //todos os livros/
bookRouter.get('/singleBook/:bookId');        //Livro especifico
bookRouter.get('/userBooks/:userId');         //Livros de um usuario
bookRouter.post('/add/:userId');              //Adicionar livro/
bookRouter.put('/update/:bookId/:userId');    //Atualizar livro
bookRouter.delete('/delete/:bookId/:userId'); //Deletar livro

export default bookRouter;