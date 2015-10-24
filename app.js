var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var cities = {
  'Lotopia': 'Lotopia City',
  'Caspiana': 'Caspiana City',
  'Indigo': 'Indigo City'
  };

app.use(express.static('public'));

app.get('/', function(request, response){
  response.send('ok');
});

app.get('/cities', function(request, response){
  response.json(Object.keys(cities));
});

app.post('/cities', urlencodedParser, function(request, response){
  var newCity = request.body;
  cities[newCity.name] = newCity.description;
  response.status(201).json(newCity.name);
});

module.exports = app;
