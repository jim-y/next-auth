import { readFile, writeFile } from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import { setCookie } from '../../src/utils'
import { parse } from 'cookie'

export default async (req, res) => {
  console.log(`[${new Date()}] - POST /api/logout`)

  const cookie = parse(req.headers.cookie)
  const file = await promisify(readFile)(
    join(process.cwd(), './src/sessions.json'),
    'utf8'
  )
  const sessions = JSON.parse(file)

  // We only need to clear the session and the cookie if the user is
  // logged in that is, she has a "session"
  if (sessions.findIndex((session) => session === cookie.auth) > -1) {
    // Clearing the "session" from the store
    await promisify(writeFile)(
      join(process.cwd(), './src/sessions.json'),
      JSON.stringify([])
    )

    // Clearing the cookie from the browser
    setCookie(res, 'auth', 'delete', {
      sameSite: true,
      httpOnly: true,
      path: '/',
      maxAge: 0,
    })
  }

  res.statusCode = 200
  res.send('Ok')
}
