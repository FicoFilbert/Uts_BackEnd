const productsRepository = require('./products-repository');

/**
 * Get list of products
 * @returns {Array}
 */
async function getProducts(pageNumber, pageSize, search, sort) {
  let filter = {};
  let sortedData = {};

  if (search) {
    const [fieldName, searchKey] = search.split(':');
    if (['price'].includes(fieldName)) {
      filter[fieldName] = parseFloat(searchKey); // Parse as number for numeric fields
    } else {
      const escapedSearchKey = searchKey.replace(
        /[-\/\\^$*+?.()|[\]{}]/g,
        '\\$&'
      );
      filter[fieldName] = new RegExp(escapedSearchKey, 'i');
    }
  }

  if (sort) {
    const [fieldName, sortOrder] = sort.split(':');
    sortedData[fieldName] = sortOrder === 'desc' ? -1 : 1;
  }

  const products = await productsRepository.getProducts(
    pageNumber,
    pageSize,
    filter,
    sortedData
  );

  return products;
}

async function getTotalProducts() {
  const totalProducts = await productsRepository.getTotalProducts();
  return totalProducts;
}

/**
 * Get product detail
 * @param {string} id - Product ID
 * @returns {Object}
 */
async function getProduct(id) {
  const product = await productsRepository.getProduct(id);

  if (!product) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
  };
}

/**
 * Create new product
 * @param {string} name - Name
 * @param {string} price - Price
 * @param {string} description - Description
 * @returns {boolean}
 */
async function createProduct(name, price, description) {
  try {
    await productsRepository.createProduct(name, price, description);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing product
 * @param {string} id - Product ID
 * @param {string} name - Name
 * @param {string} price - Price
 * @param {string} description - Description
 * @returns {boolean}
 */
async function updateProduct(id, name, price, description) {
  const data = await productsRepository.getProduct(id);

  // Product not found
  if (!data) {
    return null;
  }

  try {
    await productsRepository.updateProduct(id, name, price, description);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete product
 * @param {string} id - Product ID
 * @returns {boolean}
 */
async function deleteProduct(id) {
  const data = await productsRepository.getProduct(id);

  // Product not found
  if (!data) {
    return null;
  }

  try {
    await productsRepository.deleteProduct(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getTotalProducts,
};
