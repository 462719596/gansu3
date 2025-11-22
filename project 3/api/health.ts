import { util } from './_util'

export default function handler(req: any, res: any) {
  util.send(res, 200, { status: 'ok' })
}

