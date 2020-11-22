const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const authRouter = require('./api/auth')
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.prepare().then(() => {
  const server = express()

  server.use(cookieParser())
  server.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: true,
        path: '/',
        httpOnly: true,
        maxAge: 60000, // minute
      },
    })
  )
  server.use(express.json())

  server.use('/api', authRouter)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
