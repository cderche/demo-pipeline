var router  = require('express').Router()

// Example known subdomains, should be pulled from db
var SUBDOMAINS  = ['', 'client1', 'client2', 'client3']

router.use(function(req, res, next) {
  console.log(req.headers);
  var subdomain = req.headers.host.split('.')[0]
  console.log('subdomain', subdomain);

  if (SUBDOMAINS.indexOf(subdomain) > -1) {
    next()
  }else{
    res.redirect(404, '/')
  }
})

module.exports = router
