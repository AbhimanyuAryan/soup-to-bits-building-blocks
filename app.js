var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(request, response){
  response.send('ok');
});

app.get('/cities', function(request, response){
  var cities = ['Lotopia', 'Caspiana', 'Indigo'];
  response.json(cities);
});

module.exports = app;
