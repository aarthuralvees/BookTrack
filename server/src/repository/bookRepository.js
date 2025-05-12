import { database } from "../database/index.js";

class BookRepository {
  async getAll() {
    const { data, error } = await database
      .from('livro')
      .select('*')

    if (error) throw error
    return data
  }

  async create({ titulo, autor, status, avaliacao, data_conclusao, usuario_id }) {
    const { data, error } = await database
      .from('livro')
      .insert({ titulo, autor, status, avaliacao, data_conclusao, usuario_id })
      .select()

    if (error) throw error
    return data[0]
  }

  async update(id, { titulo, autor, status, avaliacao, data_conclusao, usuario_id }) {
    const { data, error } = await database
      .from('livro')
      .update({ titulo, autor, status, avaliacao, data_conclusao, usuario_id })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  }

  async findById(id) {
    const { data, error } = await database
      .from('livro')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  }

  async findUserBooks(userId) {
    const { data, error } = await database
      .from('livro')
      .select('*')
      .eq('usuario_id', userId)
    if (error) throw error
    return data
  }

  async delete(id) {
    const { error } = await database
      .from('livro')
      .delete()
      .eq('id', id)
    if (error) throw error
  }
}

export default new BookRepository();