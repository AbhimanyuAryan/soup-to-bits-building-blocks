var express = require('express');
var redis = require('../lib/redis');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var router = express.Router();

router.route('/')

  .get(function(request, response){
    redis.hkeys('cities', function(err, data){
      if (err) throw err;

      response.json(data);
    });
  })

  .post(urlencodedParser, function(request, response){
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

router.route('/:name')

  .get(function(request, response){
    redis.hget('cities', request.params.name, function(err, data){
      if (err) throw err;

      response.render('show.ejs', { city :
                                    { name : request.params.name,
                                      description : data
                                    }
                                });
    });
  })

  .delete(function(request, response){
    redis.hdel('cities', request.params.name, function(err){
      if (err) throw err;

      response.sendStatus(204);
    });
  });

module.exports = router;
