var cluster = require('cluster');
var express = require('express');
var os      = require('os');
var PORT    = process.env.PORT || 8080;

if (cluster.isMaster) {
   
   // Count the machine's CPUs
   var cpuCount = require('os').cpus().length;
   
   // Create a worker for each CPU
   for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
   }
   
} else {
   
   var app  = express();
   
   app.get('/', function(req, res) {
      res.send(`Host: ${os.hostname()}, Worker: ${cluster.worker.id}`);
   });
  
  app.listen(PORT, function() {
    console.log(`Worker ${cluster.worker.id} listening on ${PORT}`);
  });
  
}
