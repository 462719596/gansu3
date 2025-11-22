import { util } from '../_util'
import { store } from '../_store'

function requireAdmin(req: any) {
  const token = util.parseCookies(req.headers.cookie)['token']
  const user = token ? util.verify(token) : null
  return user && user.role === 'admin'
}

export default async function handler(req: any, res: any) {
  if (!requireAdmin(req)) return util.send(res, 403, { error: 'forbidden' })
  const { id } = (req.query || {})
  if (req.method === 'PUT') {
    const body = await util.readJson(req)
    const updated = store.users.update(String(id), body || {})
    if (!updated) return util.send(res, 404, { error: 'not_found' })
    return util.send(res, 200, updated)
  }
  if (req.method === 'DELETE') {
    const removed = store.users.remove(String(id))
    if (!removed) return util.send(res, 404, { error: 'not_found' })
    return util.send(res, 200, removed)
  }
  util.send(res, 405, 'method_not_allowed')
}

