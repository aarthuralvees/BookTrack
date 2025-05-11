import { bookDto, updateBook } from '../DTO/bookDto.js'
import BookRepository from '../repository/bookRepository'
import { ZodError } from 'zod'

class BookController {
  async addBook(req, res) {
    try {
      const data = req.body
      const parseData = bookDto.parse(data)
      userId = req.params

      const novoLivro = await BookRepository({ ...parseData, usuario_id: userId })

      return res.status(201).json({
        message: 'Livro adicionado a biblioteca',
        livro: novoLivro,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: error.errors[0].message,
          errors: error.errors,
        })
      }
      console.error(error)
      return res.status(500).json({ message: 'Erro interno no servidor' })
    }
  }

  async getAll(req, res) {
    try {
      const books = await BookRepository.getAll()
      if (books.length === 0) {
        return res.status(404).json({ message: 'Nenhum livro no sistema' })
      }

      res.status(200).json(books)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }



}

export default new BookController();