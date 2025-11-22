import crypto from 'crypto'

const secret = process.env.JWT_SECRET || 'dev-secret'

function sign(payload: any) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = crypto.createHmac('sha256', secret).update(data).digest('base64url')
  return `${data}.${sig}`
}

function verify(token: string) {
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [data, sig] = parts
  const expected = crypto.createHmac('sha256', secret).update(data).digest('base64url')
  if (sig !== expected) return null
  try {
    return JSON.parse(Buffer.from(data, 'base64url').toString())
  } catch {
    return null
  }
}

function parseCookies(cookieHeader?: string) {
  const out: Record<string, string> = {}
  if (!cookieHeader) return out
  cookieHeader.split(';').forEach(p => {
    const idx = p.indexOf('=')
    if (idx > -1) {
      const k = p.slice(0, idx).trim()
      const v = p.slice(idx + 1).trim()
      out[k] = v
    }
  })
  return out
}

function send(res: any, status: number, body: any) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(typeof body === 'string' ? body : JSON.stringify(body))
}

async function readJson(req: any) {
  if ((req as any).body) return (req as any).body
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(Buffer.from(chunk))
  const text = Buffer.concat(chunks).toString()
  try { return JSON.parse(text) } catch { return {} }
}

function setCookie(res: any, name: string, value: string, opts: { maxAge?: number; path?: string; secure?: boolean; sameSite?: 'none' | 'lax'; httpOnly?: boolean } = {}) {
  const parts = [`${name}=${value}`]
  if (opts.path) parts.push(`Path=${opts.path}`); else parts.push('Path=/')
  if (opts.httpOnly) parts.push('HttpOnly')
  if (opts.secure) parts.push('Secure')
  if (opts.sameSite) parts.push(`SameSite=${opts.sameSite}`)
  if (opts.maxAge) parts.push(`Max-Age=${opts.maxAge}`)
  res.setHeader('Set-Cookie', parts.join('; '))
}

export const util = { sign, verify, parseCookies, send, readJson, setCookie }

