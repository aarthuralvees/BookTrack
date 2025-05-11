// import { database } from "../database.js";

// class BookRepository {
//   async getAll() {
//     const { data, error } = await database
//       .from('livro')
//       .select('*')

//     if (error) throw error
//     return data
//   }

//   async create({ titulo, autor, status, avaliacao, data_conclusao, usuario_id }) {
//     const { data, error } = await database
//       .from('livro')
//       .insert({ titulo, autor, status, avaliacao, data_conclusao, usuario_id })
//       .select()

//     if (error) throw error
//     return data[0]
//   }

//   async update({ titulo, autor, status, avaliacao, data_conclusao, usuario_id }) {
//     const { data, error } = await database
//       .from('livro')
//       .update({ titulo, autor, status, avaliacao, data_conclusao, usuario_id })
//       .eq('id', id)
//       .select()
//     if (error) throw error
//     return data[0]
//   }

//   async findById(id) {
//     const { data, error } = await database
//       .from('livro')
//       .select('*')
//       .eq('id', id)
//       .maybeSingle()
//     if (error) throw error
//     return data
//   }

//   async findByTitle(titulo) {
//     const { data, error } = await database
//       .from('livro')
//       .select('*')
//       .eq('titulo', titulo)
//       .maybeSingle()
//     if (error) throw error
//     return data
//   }

//   async delete(id) {
//     const { error } = await supabase
//       .from('livro')
//       .delete()
//       .eq('id', id)
//     if (error) throw error
//   }
// }

// export default new BookRepository();