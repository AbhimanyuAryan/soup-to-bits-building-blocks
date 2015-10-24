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

  //Validate the input fields
  if (!newCity.name || !newCity.description) {
    response.sendStatus(400);
    return;
  }

  redis.hset('cities', newCity.name, newCity.description, function(err){
    if (err) throw err;

    response.status(201).json(newCity.name);
  });
});

app.delete('/cities/:name', function(request, response){
  redis.hdel('cities', request.params.name, function(err){
    if (err) throw err;

    response.sendStatus(204);
  });
});

module.exports = app;
