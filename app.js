var express = require('express');
var bodyParser = require('body-parser');
var redis = require('./lib/redis');

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/', function(request, response){
  response.send('ok');
});

app.get('/cities', function(request, response){
  redis.hkeys('cities', function(err, data){
    if (err) throw err;

    response.json(data);
  });
});

app.post('/cities', urlencodedParser, function(request, response){
  var newCity = request.body;
  redis.hset('cities', newCity.name, newCity.description, function(err){
    if (err) throw err;

    response.status(201).json(newCity.name);
  });
});

module.exports = app;
