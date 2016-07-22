var express = require('express')
var app     = express()

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.listen(port, function() {
  console.log('Listening on port ', port)
})
