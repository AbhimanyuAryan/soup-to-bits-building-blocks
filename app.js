var express = require('express');
var app = express();

var cities = require('./routes/cities');

app.use(express.static('public'));

//Routers
app.use('/cities', cities);

module.exports = app;
