const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const { updateProduct } = require('./products-repository');
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports = {
  createProduct: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      price: joi.number().label('Price'),
      description: joi.string().min(1).max(255).required().label('Description'),
    },
  },

  updateProduct: {
    body: {
      name: joi.string().min(1).max(100).label('Name'),
      price: joi.number().label('Price'),
      description: joi.string().min(1).max(255).label('Description'),
    },
  },
};
