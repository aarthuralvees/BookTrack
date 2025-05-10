import { Router } from "express";

const bookRouter = Router;

bookRouter.get('/');           //todos os livros
bookRouter.get('/:idLivro');   //Livro especifico
bookRouter.get('/:idUser');    //Livros de um usuario
bookRouter.post('/:idUser');   //Adicionar livro
bookRouter.put('/:idLivro');   //Atualizar livro
bookRouter.delete('/idLivro'); //Deletar livro

export default bookRouter;