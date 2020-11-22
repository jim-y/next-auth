var express = require('express')
var router = express.Router()

const registeredUser = {
  email: 'asd@asd.com',
  password: 'asd',
}

router.post('/login', function (req, res, next) {
  const { email, password } = req.body
  if (email === registeredUser.email && password === registeredUser.password) {
    req.session.user = {
      email,
    }
    res.sendStatus(200)
  } else {
    res.sendStatus(401)
  }
})

router.post('/session', function (req, res, next) {
  if (!req.session.user) {
    res.sendStatus(401)
    return
  }

  res.sendStatus(200)
})

router.post('/logout', function (req, res, next) {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.sendStatus(400)
      } else {
        res.sendStatus(200)
      }
    })
  }
})

module.exports = router
