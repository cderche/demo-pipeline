var os  = require('os')

var CPU_COUNT       = os.cpus().length;
var WEB_CONCURRENCY = process.env.WEB_CONCURRENCY || Math.round(CPU_COUNT / 2);

var WEB_NODES       = Math.min(CPU_COUNT, WEB_CONCURRENCY)
var WORKER_NODES    = CPU_COUNT - WEB_NODES

console.log(`CPU Count: ${CPU_COUNT}`);
console.log(`Web Nodes: ${WEB_NODES}`);
console.log(`Worker Nodes: ${WORKER_NODES}`);
