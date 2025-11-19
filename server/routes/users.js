import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import bcrypt from 'bcryptjs'
import { prisma } from '../db/prisma.js'

const router = Router()

router.get('/', requireAuth, requireAdmin, async (req, res) => {
  const items = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(items.map(u => ({ id: u.id, email: u.email, name: u.name, role: u.role })))
})

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const { email, name, password, role } = req.body
  if (!email || !password) return res.status(400).json({ error: 'invalid_input' })
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) return res.status(409).json({ error: 'email_exists' })
  const item = await prisma.user.create({ data: { email, name, role: role || 'user', passwordHash: await bcrypt.hash(password, 10) } })
  res.status(201).json({ id: item.id, email: item.email, name: item.name, role: item.role })
})

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params
  const patch = { ...req.body }
  if (patch.password) {
    patch.passwordHash = await bcrypt.hash(patch.password, 10)
    delete patch.password
  }
  try {
    const u = await prisma.user.update({ where: { id }, data: patch })
    res.json({ id: u.id, email: u.email, name: u.name, role: u.role })
  } catch (e) {
    res.status(404).json({ error: 'not_found' })
  }
})

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params
  try {
    const removed = await prisma.user.delete({ where: { id } })
    res.json({ id: removed.id, email: removed.email })
  } catch (e) {
    res.status(404).json({ error: 'not_found' })
  }
})

export default router