var throng  = require('throng');

var kue   = require('./job_queue').kue
var queue = require('./job_queue').queue

var CONCURRENCY  = process.env.WORKER_CONCURRENCY || 1

throng({
  workers:  CONCURRENCY,
  master:   master,
  start:    start
})

function master() {
  console.log('Started master');
  kue.app.listen(3000)
}

function start(id) {
  console.log(`Starting worker ${id}`);

  queue.process('video', 2, function(job, done){
    var pending = 20
      , total = pending;

    var interval = setInterval(function(){
      job.log('converting!');
      job.progress(total - pending, total);
      --pending || done();
      pending || clearInterval(interval);
    }, 1000);
  });

  queue.process('email', 10, function(job, done){
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
