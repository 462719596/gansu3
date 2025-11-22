import { util } from '../_util'
import { store } from '../_store'

function requireAdmin(req: any) {
  const token = util.parseCookies(req.headers.cookie)['token']
  const user = token ? util.verify(token) : null
  return user && user.role === 'admin'
}

export default async function handler(req: any, res: any) {
  if (!requireAdmin(req)) return util.send(res, 403, { error: 'forbidden' })
  if (req.method === 'GET') return util.send(res, 200, store.gallery.list())
  if (req.method === 'POST') return util.send(res, 400, { error: 'upload_disabled' })
  util.send(res, 405, 'method_not_allowed')
}

