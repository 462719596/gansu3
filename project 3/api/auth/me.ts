import { util } from '../_util'

export default function handler(req: any, res: any) {
  const cookies = util.parseCookies(req.headers.cookie)
  const token = cookies['token']
  const user = token ? util.verify(token) : null
  if (!user) return util.send(res, 401, { error: 'unauthorized' })
  util.send(res, 200, { id: user.id, email: user.email, role: user.role })
}

