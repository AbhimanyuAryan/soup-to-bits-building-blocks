'use strict';

var redis = require('redis');
var client = redis.createClient();

var environment = {
  'DEV' : 1,
  'TST' : 2,
  'STG' : 3,
  'PRD' : 4
};

client.select(environment[process.env.NODE_ENV] || environment.DEV);

console.log('redis-server running on ' + (process.env.NODE_ENV || 'DEV') + ' environment');

client.on('error', function(err) {
  throw err;
});

module.exports = client;
