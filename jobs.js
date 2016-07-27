if(!global.hasOwnProperty('jobs')) {
  console.log('connecting to job queue');
  global.jobs = require('kue').createQueue({ redis: process.env.REDIS_URL });
}

module.exports = global.jobs
