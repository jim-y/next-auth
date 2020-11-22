import { readFile, writeFile } from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import { randomBytes } from 'crypto'
import { setCookie } from '../../src/utils'

export default async (req, res) => {
  console.log(`[${new Date()}] - POST /api/login`)

  const { email, password } = req.body
  // .. validate email + pass ...
  const session = randomBytes(8).toString('hex')

  await promisify(writeFile)(
    join(process.cwd(), './src/sessions.json'),
    JSON.stringify([session])
  )

  setCookie(res, 'auth', session, {
    sameSite: true,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  res.statusCode = 200
  res.send(res.getHeader('Set-Cookie'))
}
