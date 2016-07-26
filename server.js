var throng  = require('throng')
var web     = require('./web');

var CONCURRENCY  = process.env.WEB_CONCURRENCY || 1

throng({
  workers:  CONCURRENCY,
  start:    start
})

function start(id) {
  console.log(`Starting web ${id}`);
  var dyno = web(id)
}
