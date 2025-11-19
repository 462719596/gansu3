import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { prisma } from '../db/prisma.js'

const router = Router()

router.get('/', requireAuth, requireAdmin, async (req, res) => {
  const items = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(items)
})

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const { userId, itineraryId, startDate, peopleCount, price, status } = req.body
  if (!userId || !itineraryId) return res.status(400).json({ error: 'invalid_input' })
  const item = await prisma.booking.create({ data: {
    userId,
    itineraryId,
    startDate: startDate ? new Date(startDate) : new Date(),
    peopleCount: Number(peopleCount) || 1,
    price: Number(price) || 0,
    status: status || 'pending'
  } })
  res.status(201).json(item)
})

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params
  try {
    const item = await prisma.booking.update({ where: { id }, data: { ...req.body } })
    res.json(item)
  } catch (e) {
    res.status(404).json({ error: 'not_found' })
  }
})

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params
  try {
    const item = await prisma.booking.delete({ where: { id } })
    res.json(item)
  } catch (e) {
    res.status(404).json({ error: 'not_found' })
  }
})

export default router