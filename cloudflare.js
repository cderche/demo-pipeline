if (!process.env.CF_EMAIL)  console.warn('Missing CF_EMAIL');
if (!process.env.CF_KEY)    console.warn('Missing CF_KEY');
if (!process.env.ZONE_NAME) console.warn('Missing ZONE_NAME');
if (!process.env.APP_URL)   console.warn('Missing APP_URL');
if (!process.env.NODE_ENV)  console.warn('Missing NODE_ENV');

var cloudflare  = require('cloudflare')
var client      = new cloudflare({
  email:  process.env.CF_EMAIL,
  key:    process.env.CF_KEY
})

module.exports = {

  addCName: function(name, cb) {
    client.browseZones({ name: process.env.ZONE_NAME}).then(
      function(paginatedResponse) {

        var properties = {
          type:     'CNAME',
          name:     name,
          content:  process.env.APP_URL,
          zoneId:   paginatedResponse.result[0].id
        }
        if (process.env.NODE_ENV != 'production') properties.name = name + '.' + process.env.NODE_ENV;

        var record  = cloudflare.DNSRecord.create(properties)
        console.log(record);
        client.addDNS(record).then(
          function(res) {
            cb(null, res)
          },
          function(err) {
            console.error('Error adding DNS', err);
            cb(err)
          }
        )
      },
      function(err) {
        console.error('Error browsing zones');
        cb(err);
      }
    );
  }

}
