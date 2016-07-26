var cluster     = require('cluster');
var os          = require('os');
var express     = require('express');
var bodyParser  = require('body-parser');

var PORT        = process.env.PORT || 8080;

var heroku      = require('./heroku');

if (cluster.isMaster) {

  // Count the machine's CPUs
  var cpuCount = os.cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

} else {

  var app  = express();
  app.use(bodyParser.json());

  app.use(function(req, res, next) {
    console.log(`You are in subdomain ${JSON.stringify(req.subdomains)}!`);
    next();
  });

  app.get('/', function(req, res) {
    res.send(`Host: ${os.hostname()}, Worker: ${cluster.worker.id}, Subdomain: ${JSON.stringify(req.subdomains)}`);
  });

  app.listen(PORT, function() {
    console.log(`Worker ${cluster.worker.id} listening on ${PORT}`);
  });

}
