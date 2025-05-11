import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
  const [scheme, token] = (req.headers.authorization || '').split('')
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).send('Token não fornecido, acesso negado')
  }
  try {
    const { user } = jwt.verify(token, process.env.DB_JWT_SECRET)
    req.user = JSON.parse(user)
    next()
  } catch {
    res.status(401).json({ message: 'Token inválido' })
  }
}