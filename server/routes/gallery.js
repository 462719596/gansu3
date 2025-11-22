import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuid } from 'uuid'
import { prisma } from '../db/prisma.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads')
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${uuid()}${ext}`)
  }
})
const upload = multer({ storage })

const router = Router()

router.get('/', requireAuth, requireAdmin, async (req, res) => {
  const items = await prisma.galleryImage.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(items)
})

router.post('/', requireAuth, requireAdmin, upload.single('file'), async (req, res) => {
  const { title } = req.body
  if (!req.file) return res.status(400).json({ error: 'file_required' })
  const url = `/uploads/${req.file.filename}`
  const item = await prisma.galleryImage.create({ data: { title: title || '', url } })
  res.status(201).json(item)
})

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params
  try {
    const item = await prisma.galleryImage.delete({ where: { id } })
    res.json(item)
  } catch (e) {
    res.status(404).json({ error: 'not_found' })
  }
})

export default router
