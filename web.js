var throng    = require('throng')
var express   = require('express')
var subdomain = require('express-subdomain')
var api       = require('./api')

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

  app.use(subdomain('api', api))

  app.get('/', function(req, res) {
    res.send(`Worker ${workerId} says: "Hello World!"`)
  })

  app.listen(PORT, function() {
    console.log('Listening on port ', PORT)
  })

}
