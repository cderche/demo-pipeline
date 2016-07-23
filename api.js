var router  = require('express').Router()

router.use('/', function(req, res) {
  res.send("Welcome to our API!")
})

module.exports = router
