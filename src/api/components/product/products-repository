const { Product } = require('../../../models');

/**
 * Get a list of products
 * @returns {Promise}
 */
async function getProducts(pageNumber, pageSize, filter, sort) {
  const skipCount = (pageNumber - 1) * pageSize;

  let query = {};
  if (filter) {
    query = { $or: [filter] };
  }

  return Product.find(query).sort(sort).skip(skipCount).limit(pageSize);
}

/**
 * Get product detail
 * @param {string} id - Product ID
 * @returns {Promise}
 */
async function getProduct(id) {
  return Product.findById(id);
}

async function getTotalProducts() {
  return Product.countDocuments();
}

/**
 * Create new product
 * @param {string} name - Name
 * @param {string} price - Price
 * @param {string} description - Description
 * @returns {Promise}
 */
async function createProduct(name, price, description) {
  return Product.create({
    name,
    price,
    description,
  });
}

/**
 * Update existing product
 * @param {string} id
 * @param {string} name - Name
 * @param {string} price - Price
 * @param {string} description - Description
 * @returns {Promise}
 */
async function updateProduct(id, name, price, description) {
  return Product.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        price,
        description,
      },
    }
  );
}

/**
 * Delete a product
 * @param {string} id - Product ID
 * @returns {Promise}
 */
async function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getTotalProducts,
};
