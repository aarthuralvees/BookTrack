import { userDto, updateUserDto } from "../DTO/userDto.js";
import { UserRepository } from "../repository/index.js";
import { ZodError } from 'zod';

class UserController {
  async createUser(req, res) {
    try {
      const data = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
      }

      const parseData = userDto.parse(data)

      const usuarioExistente = await UserRepository.findByEmail(parseData.email)
      if (usuarioExistente) {
        return res.status(400).json({ message: 'Usuário com esse email já existe' })
      }

      const novoUser = await UserRepository.create(data)
      return res.status(201).json({
        message: 'Usuário criado',
        user: novoUser,
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

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UserRepository.findById(id)
      if (!usuario) {
        return res.status(404).json({
          message: 'Usuário não encontrado',
        })
      }

      if (req.userId != id) {
        return res.status(403).json({ message: "Conta não pertence ao usuário logado" })
      }

      const data = {
        ...req.body
      }

      const parseData = updateUserDto.parse(data)
      const usuarioAtualizado = await UserRepository.update(id, parseData)

      return res.status(200).json({
        message: 'Perfil atualizado',
        user: usuarioAtualizado
      })
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async findUserByEmail(req, res) {
    try {
      const { email } = req.params
      const user = await UserRepository.findByEmail(email)
      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontrado',
        })
      }

      if (req.userId !== user.id) {
        return res.status(403).json({ message: "Conta não pertence ao usuário logado" })
      }

      res.status(200).json(user)

    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async findUserById(req, res) {
    try {
      const { id } = req.params
      const user = await UserRepository.findById(id)
      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontrado',
        })
      }

      if (req.userId !== user.id) {
        return res.status(403).json({ message: "Conta não pertence ao usuário logado" })
      }

      res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async listUsers(req, res) {
    try {
      const users = await UserRepository.getAll()
      if (users.length === 0) {
        return res.status(404).json({ message: 'Nenhum usuário no sistema' })
      }

      res.status(200).json(users)

    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async deleteUser(req, res) {
    try {
      const { idUsuario } = req.params
      const usuario = await UserRepository.findById(idUsuario)
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }

      if (req.userId !== user.id) {
        return res.status(403).json({ message: "Conta não pertence ao usuário logado" })
      }

      await UserRepository.delete(idUsuario)
      res.status(200).json({ message: 'Usuário deletado' })
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}

export default new UserController();