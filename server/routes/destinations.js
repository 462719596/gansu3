import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { prisma } from '../db/prisma.js'

const router = Router()

router.get('/', requireAuth, requireAdmin, async (req, res) => {
  const page = Number(req.query.page) || 1
  const pageSize = Number(req.query.pageSize) || 20
  const q = (req.query.q || '').toString().trim()
  const where = q ? { name: { contains: q } } : {}
  const [items, total] = await Promise.all([
    prisma.destination.findMany({ where, skip: (page - 1) * pageSize, take: pageSize, orderBy: { createdAt: 'desc' } }),
    prisma.destination.count({ where })
  ])
  res.json({ items, total, page, pageSize })
})

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const { name, region, type, description, coverImageUrl, location, tags } = req.body
  if (!name) return res.status(400).json({ error: 'name_required' })
  const item = await prisma.destination.create({ data: { name, region, type, description, coverImageUrl, location, tags: Array.isArray(tags) ? tags.join(',') : (tags || '') } })
  res.status(201).json(item)
})

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params
  try {
    const item = await prisma.destination.update({ where: { id }, data: { ...req.body, tags: Array.isArray(req.body.tags) ? req.body.tags.join(',') : req.body.tags } })
    res.json(item)
  } catch (e) {
    res.status(404).json({ error: 'not_found' })
  }
})

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params
  try {
    const item = await prisma.destination.delete({ where: { id } })
    res.json(item)
  } catch (e) {
    res.status(404).json({ error: 'not_found' })
  }
})

export default router