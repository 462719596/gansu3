import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { prisma } from '../db/prisma.js'

const router = Router()

router.get('/', requireAuth, requireAdmin, async (req, res) => {
  const page = Number(req.query.page) || 1
  const pageSize = Number(req.query.pageSize) || 20
  const q = (req.query.q || '').toString().trim()
  const where = q ? { title: { contains: q } } : {}
  const [items, total] = await Promise.all([
    prisma.itinerary.findMany({ where, skip: (page - 1) * pageSize, take: pageSize, orderBy: { createdAt: 'desc' } }),
    prisma.itinerary.count({ where })
  ])
  res.json({ items, total, page, pageSize })
})

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const { title, days, price, description, coverImageUrl } = req.body
  if (!title) return res.status(400).json({ error: 'title_required' })
  const item = await prisma.itinerary.create({ data: { title, days: Number(days) || 0, price: Number(price) || 0, description, coverImageUrl } })
  res.status(201).json(item)
})

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params
  try {
    const item = await prisma.itinerary.update({ where: { id }, data: { ...req.body, days: req.body.days !== undefined ? Number(req.body.days) : undefined, price: req.body.price !== undefined ? Number(req.body.price) : undefined } })
    res.json(item)
  } catch (e) {
    res.status(404).json({ error: 'not_found' })
  }
})

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params
  try {
    const item = await prisma.itinerary.delete({ where: { id } })
    res.json(item)
  } catch (e) {
    res.status(404).json({ error: 'not_found' })
  }
})

export default router