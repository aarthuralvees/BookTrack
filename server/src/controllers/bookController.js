import { bookDto, updateBook } from '../DTO/bookDto.js'
import { BookRepository } from '../repository/index.js'
import { ZodError } from 'zod'

class BookController {
  async addBook(req, res) {
    try {
      const data = req.body
      const parseData = bookDto.parse(data)

      if (parseData.status === 'Lido') {
        parseData.data_conclusao = new Date().toISOString()
      }

      const novoLivro = await BookRepository.create({ ...parseData, usuario_id: req.userId })

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

  async updateBook(req, res) {
    try {
      const { bookId } = req.params
      const book = await BookRepository.findById(bookId)

      if (!book) {
        return res.status(404).json({ message: "Livro não encontrado" })
      }

      if (book.usuario_id !== req.userId) {
        return res.status(500).json({ message: 'Livro não pertence a esse usuário' })
      }

      const data = { ...req.body }
      const parseData = updateBook.parse(data)
      if ('status' in parseData) {
        if (parseData.status === 'Lido') {
          parseData.data_conclusao = new Date().toISOString()
        } else {
          delete parseData.data_conclusao
        }
      }

      const livroAtualizado = await BookRepository.update(bookId, parseData)

      res.status(200).json({
        message: "Livro atualizado",
        livro: livroAtualizado
      })
    } catch (error) {
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

  async getUserBooks(req, res) {
    try {
      const books = await BookRepository.findUserBooks(req.userId)
      if (books.length === 0) {
        return res.status(404).json({ message: 'O usuário não adicionou nenhum livro' })
      }

      res.status(200).json(books)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async findBook(req, res) {
    try {
      const { bookId } = req.params
      const book = await BookRepository.findById(bookId)
      if (!book) {
        return res.status(404).json({ message: "Livro não encontrado" })
      }

      res.status(200).json(book)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async delete(req, res) {
    try {
      const { bookId } = req.params
      const book = await BookRepository.findById(bookId)
      if (!book) {
        return res.status(404).json({ message: "Livro não encontrado" })
      }

      if (book.usuario_id != req.userId) {
        return res.status(403).json({ message: "Livro não pertence a esse usuário" })
      }

      await BookRepository.delete(bookId)
      res.status(200).json({ message: "Livro deletado" })

    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}

export default new BookController();