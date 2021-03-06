var request = require('supertest');
var app = require('./app');

require('./lib/redis').flushdb();

describe('Requests to the root path', function(){

  it('Returns a 200 status code', function(done){

    request(app)
      .get('/')
      .expect(200, done);
  });

  it('Returns a HTML format', function(done){

    request(app)
    .get('/')
    .expect('Content-Type', /html/,  done);

  });

  it('Returns an index file with cities', function(done){

    request(app)
    .get('/')
    .expect(/cities/i, done);

  });

  it('Validate city name and description', function(done){

    request(app)
    .post('/cities')
    .send('name=&description=')
    .expect(400, done);

  });

});

describe('Listing cities on /cities', function(){

  it('Returns a 200 status code', function(done){

    request(app)
      .get('/cities')
      .expect(200, done);
  });

  it('Returns JSON format', function(done){

    request(app)
      .get('/cities')
      .expect('Content-Type', /json/, done);
  });

  it('Returns initial cities', function(done){

    request(app)
    .get('/cities')
    .expect([], done);

  });

});

describe('Creating new cities', function(){

  it('Returning a 201 status code', function(done){

    request(app)
    .post('/cities')
    .send('name=Springfield&description=where+the+simpsons+live')
    .expect(201, done);

  });

  it('Return the city name', function(done){

    request(app)
    .post('/cities')
    .send('name=Springfield&description=where+the+simpsons+live')
    .expect(/springfield/i, done);

  });

});

describe('Shows city info', function(){

  it('Returns a 200 status code', function(done){

    request(app)
    .get('/cities/Springfield')
    .expect(200, done);

  });

  it('Returns HTML format', function(done){

    request(app)
    .get('/cities/Springfield')
    .expect('Content-Type', /html/, done);

  });

  it('Returns city info', function(done){

    request(app)
    .get('/cities/Springfield')
    .expect(/simpsons/, done);

  });
});

describe('Deleting cities', function(){

  it('Returning a 204 status code', function(done){

    request(app)
    .delete('/cities/Springfield')
    .expect(204, done);

  });

});
