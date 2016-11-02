'use strict';

const fs = require('fs');
var path = require('path');
const Hapi = require('hapi');
const Good = require('good');
const Boom = require('boom');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const partRoutes = require('./part.routes');
const userRoutes = require('./user.routes');
const allRoutes = partRoutes.concat(userRoutes);


//Connection URL to db
const url = 'mongodb://localhost:27017/tests';

//Use connect to connect to db
MongoClient.connect(url, { db: { w: 1 } }).then( (db) => {
  // assert.equal(null, err);
  console.log(`Successfully connected to MongoDB server at: ${url}`);

  //Create hapi server 
  const server = new Hapi.Server();
  server.connection({ port: 9000 });

  server.bind({ db: db });


  // Registering the Good plugin
  server.register([{
    register: Good,
    options: {
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            error: '*',
            log: '*'
          }]
        }, {
            module: 'good-console'
          }, 'stdout']
      }
    }
  }], (err) => {
    if (err) {
      throw err;
    }

    // Starting the server
    server.start((err) => {
      if (err) {
        throw err;
      }
      console.log('Server running at:', server.info.uri);
    });
  });

  // Registering roots
  server.route(allRoutes);
})
.catch( (err) => {throw err;});