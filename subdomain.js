var router  = require('express').Router()

router.use(function(req, res, next) {
  // Multi-tenant filter
  next()
})

router.use('/', function(req, res) {
  res.send(req.vhost)
})

module.exports = router
