'use strict';

var redis = require('redis');
var client = undefined;

var environment = {

  'production'  : 0,
  'development' : 1,
  'test'        : 2
};

if (process.env.REDISTOGO_URL) {

  var rtg = require('url').parse(process.env.REDISTOGO_URL);
  client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(':')[1]);

} else {

  client = redis.createClient();
}

client.select(environment[process.env.NODE_ENV] || environment.development, function(){

  console.log('redis-server running on ' + (process.env.NODE_ENV || 'development') + ' environment');
});

client.on('error', function(err) {
  throw err;
});

module.exports = client;
