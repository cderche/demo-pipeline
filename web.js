var cluster     = require('cluster');
var os          = require('os');
var express     = require('express');
var bodyParser  = require('body-parser');

var PORT        = process.env.PORT || 8080;

// var heroku      = require('./heroku');
// var cloudflare  = require('./cloudflare');

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

  // Example HEROKU ADD DOMAIN
  app.post('/cloudflare/domain', function(req, res) {
    var name = req.body.name
    cloudflare.addCName(name, function(err, response) {
      console.log('back');
      if (err) return res.negotiate(err);
      res.end()
    })

  })

  app.listen(PORT, function() {
    console.log(`Worker ${cluster.worker.id} listening on ${PORT}`);
  });

}
