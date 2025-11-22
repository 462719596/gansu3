import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import authRouter from './routes/auth.js'
import destinationsRouter from './routes/destinations.js'
import itinerariesRouter from './routes/itineraries.js'
import galleryRouter from './routes/gallery.js'
import usersRouter from './routes/users.js'
import bookingsRouter from './routes/bookings.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(cookieParser())
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'
app.use(cors({ origin: corsOrigin, credentials: true }))

const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads')
try { fs.mkdirSync(uploadDir, { recursive: true }) } catch {}
app.use('/uploads', express.static(uploadDir))
app.use('/api/auth', authRouter)
app.use('/api/destinations', destinationsRouter)
app.use('/api/itineraries', itinerariesRouter)
app.use('/api/gallery', galleryRouter)
app.use('/api/users', usersRouter)
app.use('/api/bookings', bookingsRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`)
})
