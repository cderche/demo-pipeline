var throng      = require('throng')
var express     = require('express')
// var subdomains = require('wildcard-subdomains')
var vhost       = require('vhost')
var api         = require('./api')
var subdomain   = require('./subdomain')

// process.env.WEB_CONCURRENCY lets the port be set by Heroku
var WORKERS   = process.env.WEB_CONCURRENCY || 1
// process.env.PORT lets the port be set by Heroku
var PORT      = process.env.PORT || 8080
// process.env.HOST_URL
var HOST_URL  = process.env.HOST_URL || 'localhost'

throng({
  workers:  WORKERS,
  lifetime: Infinity,
  start:    start
})

function start(workerId) {
  console.log(`Started worker ${workerId}`)

  var app     = express()

  app.use(function(req, res, next) {
    console.log('All requests should call this');
    next()
  })

  var subdomainRegex = '*.' + HOST_URL
  app.use(vhost(subdomainRegex, subdomain))

  // app.use(subdomains())
  //
  // app.get('/_sub/*/*', function(req, res) {
  //   console.log(req.headers);
  //   var subdomain = req.subdomains
  //   res.send(subdomain)
  // })

  app.get('/', function(req, res) {
    res.send(`Worker ${workerId}`)
  })

  app.listen(PORT, function() {
    console.log('Listening on port ', PORT)
  })

}
