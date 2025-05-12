import { database } from '../database/index.js'

class UserRepository {
  async getAll() {
    const { data, error } = await database
      .from('usuario')
      .select('nome')

    if (error) throw error
    return data
  }

  async create({ nome, email, senha }) {
    const { data, error } = await database
      .from('usuario')
      .insert({ nome, email, senha })
      .select()

    if (error) throw error
    return data[0]
  }

  async update(id, { nome, email, senha }) {
    const { data, error } = await database
      .from('usuario')
      .update({ nome, email, senha })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  }

  async findByEmail(email) {
    const { data, error } = await database
      .from('usuario')
      .select('*')
      .eq('email', email)
      .maybeSingle()
    if (error) throw error
    return data
  }

  async findById(id) {
    const { data, error } = await database
      .from('usuario')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    if (error) throw error
    return data
  }

  async delete(id) {
    const { error } = await database
      .from('usuario')
      .delete()
      .eq('id', id)
    if (error) throw error
  }

  async authenticate(email) {
    const { data, error } = await database
      .from('usuario')
      .select('id, senha')
      .eq('email', email)
      .single()
    if (error) throw error
    return data
  }
}

export default new UserRepository();