var os          = require('os')
var express     = require('express')
var bodyParser  = require('body-parser')

var PORT        = process.env.PORT || 8080;

module.exports = function(id) {
  var jobs = require('.././jobs')
  var web = express()
  web.use(bodyParser.json());

  web.use(function(req, res, next) {
    // console.log(`You are in subdomain ${JSON.stringify(req.subdomains)}!`);
    next();
  });

  web.get('/', function(req, res) {

    res.send(`Host: ${os.hostname()}, Worker: ${id}, Subdomain: ${JSON.stringify(req.subdomains)}`);
  });

  web.get('/job/:type', function(req, res) {
    var type = req.params.type
    var job = jobs.create(type, {
      title:  `${type} job`,
    }).save( function(err){
      if( !err ) console.log( job.id );
    });

    res.send(`Created a ${type} job`);
  })

  web.listen(PORT, function() {
    console.log(`Web ${id} listening on ${PORT}`);
  });

  return web;
}
