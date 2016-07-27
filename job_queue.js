var kue     = require('kue')
var queue   = kue.createQueue({ redis: process.env.REDIS_URL });

module.exports = {
  kue:    kue,
  queue:  queue
}
