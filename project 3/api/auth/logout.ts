import { util } from '../_util'

export default function handler(req: any, res: any) {
  if (req.method !== 'POST') return util.send(res, 405, 'method_not_allowed')
  util.setCookie(res, 'token', '', { httpOnly: true, secure: true, sameSite: 'none', maxAge: 0 })
  util.send(res, 200, { ok: true })
}

