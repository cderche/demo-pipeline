var throng  = require('throng');

var CONCURRENCY  = process.env.WORKER_CONCURRENCY || 1

throng({
  workers:  CONCURRENCY,
  master:   master,
  start:    start
})

function master() {
  console.log('Worker master');
  // require('kue').app.listen(3000)
}

function start(id) {
  console.log(`Starting worker ${id}`);
  var jobs = require('./jobs')

  jobs.process('small', 50, function(job, done){
    var pending = 5
      , total = pending;

    var interval = setInterval(function(){
      job.log('sending!');
      job.progress(total - pending, total);
      --pending || done();
      pending || clearInterval(interval);
    }, 1000);
  });

  jobs.process('medium', 25, function(job, done){
    var pending = 25
      , total = pending;

    var interval = setInterval(function(){
      job.log('sending!');
      job.progress(total - pending, total);
      --pending || done();
      pending || clearInterval(interval);
    }, 1000);
  });

  jobs.process('large', 5, function(job, done){
    var pending = 50
      , total = pending;

    var interval = setInterval(function(){
      job.log('sending!');
      job.progress(total - pending, total);
      --pending || done();
      pending || clearInterval(interval);
    }, 1000);
  });

}
