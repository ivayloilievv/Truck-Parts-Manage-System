
'use strict';

const Joi = require('joi');
const Users = require('./user.handlers');

const userSchema = Joi.object({
          id: Joi.string().allow(''),
          email: Joi.string().min(5).required(),
          fname: Joi.string().min(2).required(),
          lname: Joi.string().min(2).required(),
          password: Joi.string().min(8).required()      
        });

module.exports = [{
  method: 'GET',
  path: '/api/users',
  handler: Users.findAll
},
  {
    method: 'GET',
    path: '/api/users/{userId}',
    handler: Users.find,
    config: {
      validate: {
        params: {
          userId: Joi.string().length(24).required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/api/users',
    handler: Users.create,
    config: {
      validate: {
        payload: userSchema
      }
    }
  },
   {
        method: 'POST',
        path: '/api/users/login',
        config: {
            handler: Users.loginUser,
            auth: false
        }
    },
  {
    method: 'PUT',
    path: '/api/users/{userId}',
    handler: Users.edit,
    config: {
      validate: {
        params: {
          userId: Joi.string().length(24).required()
        },
        payload: userSchema
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/users/{userId}',
    handler: Users.remove,
    config: {
      validate: {
        params: {
          userId: Joi.string().length(24).required()
        }
      }
    }
  }];