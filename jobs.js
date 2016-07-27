if(!global.hasOwnProperty('jobs')) {
  global.jobs = require('kue').createQueue({ redis: process.env.REDIS_URL });
}

module.exports = global.jobs
