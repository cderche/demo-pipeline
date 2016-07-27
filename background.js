var throng  = require('throng');
var jobs   = require('./jobs')

var CONCURRENCY  = process.env.WORKER_CONCURRENCY || 1

throng({
  workers:  CONCURRENCY,
  master:   master,
  start:    start
})

function master() {
  console.log('Started master');
  require('kue').app.listen(3000)
}

function start(id) {
  console.log(`Starting worker ${id}`);

  jobs.process('video', 2, function(job, done){
    var pending = 20
      , total = pending;

    var interval = setInterval(function(){
      job.log('converting!');
      job.progress(total - pending, total);
      --pending || done();
      pending || clearInterval(interval);
    }, 1000);
  });

  jobs.process('email', 10, function(job, done){
    var pending = 5
      , total = pending;

    var interval = setInterval(function(){
      job.log('sending!');
      job.progress(total - pending, total);
      --pending || done();
      pending || clearInterval(interval);
    }, 1000);
  });
}
