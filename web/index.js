var queue       = require('.././job_queue').queue

var os          = require('os')
var express     = require('express')
var bodyParser  = require('body-parser')

var PORT        = process.env.PORT || 8080;

module.exports = function(id) {
  var web = express()
  web.use(bodyParser.json());

  web.use(function(req, res, next) {
    // console.log(`You are in subdomain ${JSON.stringify(req.subdomains)}!`);
    next();
  });

  web.get('/', function(req, res) {

    res.send(`Host: ${os.hostname()}, Worker: ${id}, Subdomain: ${JSON.stringify(req.subdomains)}`);
  });

  web.get('/email', function(req, res) {
    var job = queue.create('email', {
      title:  'sending an email',
    }).save( function(err){
      if( !err ) console.log( job.id );
    });

    res.send(`Sending an email`);
  })

  web.get('/video', function(req, res) {
    var job = queue.create('video', {
      title:  'processing a video',
    }).save( function(err){
      if( !err ) console.log( job.id );
    });

    res.send(`Processing video`);
  })

  web.listen(PORT, function() {
    console.log(`Web ${id} listening on ${PORT}`);
  });

  return web;
}
