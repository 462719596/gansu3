import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { signToken, requireAuth } from '../middleware/auth.js'

const router = Router()

const adminUser = {
  id: 'u-admin-1',
  email: 'admin@example.com',
  name: 'Admin',
  role: 'admin',
  passwordHash: bcrypt.hashSync('admin123', 10)
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'invalid_input' })
  const user = email === adminUser.email ? adminUser : null
  if (!user) return res.status(401).json({ error: 'invalid_credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'invalid_credentials' })
  const token = signToken({ id: user.id, email: user.email, role: user.role })
  res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true })
  res.json({ id: user.id, email: user.email, name: user.name, role: user.role })
})

router.post('/logout', (req, res) => {
  res.clearCookie('token', { sameSite: 'none', secure: true })
  res.json({ ok: true })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, role: req.user.role })
})

export default router
