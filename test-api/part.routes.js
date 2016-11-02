
'use strict';

const Joi = require('joi');
const Parts = require('./part.handlers');

module.exports = [{
  method: 'GET',
  path: '/api/parts',
  handler: Parts.findAll
},
  {
    method: 'GET',
    path: '/api/parts/{partCatalogNumber}',
    handler: Parts.findCatalogNumber,
    config: {
      validate: {
        params: {
          partCatalogNumber: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/api/parts',
    handler: Parts.create,
    config: {
      validate: {
        payload: Joi.object({
          id: Joi.string().allow(''),
          title: Joi.string().min(2).required(),
          truckBrand: Joi.string().required(),
          catalogNumber: Joi.string().optional(),
          storageSpase: Joi.string().optional(),
          quantity: Joi.string().required(),
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/parts/{partId}',
    handler: Parts.edit,
    config: {
      validate: {
        params: {
          partId: Joi.string().length(24).required()
        },
        payload: Joi.object({
          id: Joi.string().allow(''),
          title: Joi.string().min(2).required(),
          truckBrand: Joi.string().required(),
          catalogNumber: Joi.string().optional(),
          storageSpase: Joi.string().optional(),
          quantity: Joi.string().required(),
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/parts/{partId}',
    handler: Parts.remove,
    config: {
      validate: {
        params: {
          partId: Joi.string().length(24).required()
        }
      }
    }
  }];