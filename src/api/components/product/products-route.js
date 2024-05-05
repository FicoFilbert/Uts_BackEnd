const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const productsController = require('./products-controller');
const productsValidator = require('./products-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/products', route);

  // Get list of products
  route.get('/', authenticationMiddleware, productsController.getProducts);

  // Create product
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(productsValidator.createProduct),
    productsController.createProduct
  );

  // Get product detail
  route.get('/:id', authenticationMiddleware, productsController.getProduct);

  // Update product
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(productsValidator.updateProduct),
    productsController.updateProduct
  );

  // Delete product
  route.delete(
    '/:id',
    authenticationMiddleware,
    productsController.deleteProduct
  );
};
