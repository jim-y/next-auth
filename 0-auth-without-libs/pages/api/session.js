import { readFile } from 'fs'
import { join } from 'path'
import { promisify } from 'util'

// Will be called by the protected routes to check if the user is logged in
// or not
export default async (req, res) => {
  console.log(`[${new Date()}] - POST /api/session`)

  const cookie = req.body.authCookie
  const file = await promisify(readFile)(
    join(process.cwd(), './src/sessions.json'),
    'utf8'
  )
  const sessions = JSON.parse(file)

  if (sessions.findIndex((session) => cookie === session) > -1) {
    res.statusCode = 200
    res.send('Ok')
  } else {
    res.statusCode = 401
    res.send('Unauthorized')
  }
}
