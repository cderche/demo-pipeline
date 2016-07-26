if (!process.env.HEROKU_API_TOKEN)  console.warn('Missing HEROKU_API_TOKEN');
if (!process.env.ZONE_NAME)         console.warn('Missing ZONE_NAME');
if (!process.env.APP_NAME)          console.warn('Missing APP_NAME');
if (!process.env.NODE_ENV)          console.warn('Missing NODE_ENV');


const heroku  = require('heroku-client')
const client  = new heroku({ token: process.env.HEROKU_API_TOKEN })

module.exports = {

  addSubdomain: function(name, cb) {
    var uri
    if (process.env.NODE_ENV == 'production') {
      uri = name + '.' + process.env.ZONE_NAME
    }else{
      uri = name + '.' + process.env.NODE_ENV + '.' + process.env.ZONE_NAME
    }
    client.post(
      `/apps/${process.env.APP_NAME}/domains`,
      { body: { hostname: uri } }
    ).then(
      function(res) {
        cb(null, res)
      },
      function(err) {
        cb(err)
      }
    )
  }

}
