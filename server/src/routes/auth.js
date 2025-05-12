import express from 'express'
import { UserRepository } from '../repository/index.js'
import jwt from 'jsonwebtoken'

const authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
  const { email, senha } = req.body
  const user = await UserRepository.authenticate(email)
  if (user.senha !== senha) {
    return res.status(401).json({ message: 'Credenciais inválidas' })
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.DB_JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.json({ token })
})

export default authRouter