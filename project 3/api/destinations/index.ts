import { util } from '../_util'
import { store } from '../_store'

function requireAdmin(req: any) {
  const token = util.parseCookies(req.headers.cookie)['token']
  const user = token ? util.verify(token) : null
  return user && user.role === 'admin'
}

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') return util.send(res, 200, store.destinations.list())
  if (req.method === 'POST') {
    if (!requireAdmin(req)) return util.send(res, 403, { error: 'forbidden' })
    const body = await util.readJson(req)
    return util.send(res, 201, store.destinations.create(body || {}))
  }
  util.send(res, 405, 'method_not_allowed')
}

