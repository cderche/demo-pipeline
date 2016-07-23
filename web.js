var throng    = require('throng')
var express   = require('express')
// var subdomain = require('./subdomain')
var subdomains = require('wildcard-subdomains')

// process.env.WEB_CONCURRENCY lets the port be set by Heroku
var WORKERS = process.env.WEB_CONCURRENCY || 1
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080

throng({
  workers:  WORKERS,
  lifetime: Infinity,
  start:    start
})

function start(workerId) {
  console.log(`Started worker ${workerId}`)

  var app     = express()

  app.use(subdomains())

  app.get('/_sub/*', function(req, res) {
    var subdomain = req.subdomains
    res.send(subdomain)
  })

  app.get('/', function(req, res) {
    res.send(`Worker ${workerId}`)
  })

  app.listen(PORT, function() {
    console.log('Listening on port ', PORT)
  })

}
