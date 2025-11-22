import { util } from '../_util'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return util.send(res, 405, 'method_not_allowed')
  const body = await util.readJson(req)
  const { email, password } = body || {}
  if (!email || !password) return util.send(res, 400, { error: 'invalid_input' })
  if (email !== 'admin@example.com' || password !== 'admin123') return util.send(res, 401, { error: 'invalid_credentials' })
  const token = util.sign({ id: 'u-admin-1', email, role: 'admin' })
  util.setCookie(res, 'token', token, { httpOnly: true, secure: true, sameSite: 'none' })
  util.send(res, 200, { id: 'u-admin-1', email, role: 'admin' })
}

